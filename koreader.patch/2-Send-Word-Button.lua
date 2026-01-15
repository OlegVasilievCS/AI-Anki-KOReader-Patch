local ReaderHighlight = require("apps/reader/modules/readerhighlight")
local _ = require("gettext")
local UIManager = require("ui/uimanager")
local InfoMessage = require("ui/widget/infomessage")
local http = require("socket.http")
local ltn12 = require("ltn12")
local socket = require("socket")
local util = require("util")

local FLASK_URL = "http://192.168.2.39:5000/send"

local orig_init = ReaderHighlight.init

local function make_custom_buttons(self)
    local custom_buttons = {
        {
            id = "Send Word",
            func = function()
                return {
                    text = _("Send to Flask"),
                    enabled = function()
                        return self.selected_text ~= nil
                    end,
                    callback = function()
                        local raw_text = self.selected_text.text

                        local word = util.cleanupSelectedText(tostring(raw_text))
                        word = word:gsub("^%s*(.-)%s*$", "%1")

                        if word ~= "" then
                            UIManager:show(InfoMessage:new{ text = _("Sending: ") .. word, timeout = 1 })
                            pcall(function()
                                local body = "word=" .. socket.url.escape(word)
                                http.request{
                                    url = FLASK_URL,
                                    method = "POST",
                                    headers = {
                                        ["content-type"] = "application/x-www-form-urlencoded",
                                        ["content-length"] = tostring(#body)
                                    },
                                    source = ltn12.source.string(body),
                                    sink = ltn12.sink.null(),
                                }
                            end)
                        else
                            UIManager:show(InfoMessage:new{ text = _("Error: No text selected"), timeout = 2 })
                        end
                        self:onClose()
                    end,
                }
            end
        },
        {id = "select"}, {id = "highlight"}, {id = "copy"}, {id = "dictionary"},
        {id = "translate"}, {id = "wikipedia"}, {id = "search"}, {id = "add_note"},
    }
    return custom_buttons
end

function ReaderHighlight:init(index)
    orig_init(self)
    local new_buttons = {}
    local custom_buttons = make_custom_buttons(self)

    for i, button_data in ipairs(custom_buttons) do
        local new_key = string.format("%03d_%s", i, button_data.id)

        if button_data.id == "Send Word" then
            new_buttons[new_key] = button_data.func
        else
            for orig_key, orig_button_fn in pairs(self._highlight_buttons) do
                if orig_key:find(button_data.id) then
                    new_buttons[new_key] = orig_button_fn
                    break
                end
            end
        end
    end
    self._highlight_buttons = new_buttons
end