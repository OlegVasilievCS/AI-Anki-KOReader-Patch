local ReaderHighlight = require("apps/reader/modules/readerhighlight")
local _ = require("gettext")
local UIManager = require("ui/uimanager")
local Geom = require("ui/geometry")
local logger = require("logger")

local orig_init = ReaderHighlight.init
local orig_saveHighlight = ReaderHighlight.saveHighlight

local function make_custom_buttons(self)
    local custom_buttons = {
        {
            id = "Send Word",
            func = function()
                return {
                    text = _("Send Word"),
                    enabled = function() return self.hold_pos ~= nil end,
                    callback = function()
                        local text = self.view.active_address.text
                        self:onWiki(text)
                        self:onClose()
                    end,
                }
            end
        },
        {id = "select"},
        {id = "highlight"},
        {id = "copy"},
        {id = "add_note"},
        {id = "wikipedia"},
        {id = "dictionary"},
        {id = "translate"},
        {id = "share_text"},
        {id = "view_html"},
        {id = "user_dict"},
        {id = "follow_link"},
        {id = "search"},
    }
    return custom_buttons
end

function ReaderHighlight:init(index)
    orig_init(self)
    local new_buttons = {}
    local custom_buttons = make_custom_buttons(self)

    for i, button_data in ipairs(custom_buttons) do
        local button_id = button_data.id
        local new_key = string.format("%003d_%s", i, button_id)

        if button_data.func then
            new_buttons[new_key] = button_data.func
        else
            for orig_key, orig_button_fn in pairs(self._highlight_buttons) do
                local orig_id = orig_key:sub(4)

                if orig_id == button_id then
                    new_buttons[new_key] = orig_button_fn
                    break
                end
            end
        end
    end

    self._highlight_buttons = new_buttons
end
