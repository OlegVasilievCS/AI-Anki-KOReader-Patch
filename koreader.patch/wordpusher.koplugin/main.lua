local WidgetContainer = require("ui/widget/container/widgetcontainer")
local InputDialog = require("ui/widget/inputdialog")
local UIManager = require("ui/uimanager")
local InfoMessage = require("ui/widget/infomessage")
local LuaSettings = require("luasettings")
local _ = require("gettext")

local AiAnki = WidgetContainer:extend{
    name = "ai_anki",
}

function AiAnki:init()
    local DataStorage = require("datastorage")
    self.settings_path = DataStorage:getSettingsDir() .. "/ai_anki.lua"
    self.settings = LuaSettings:open(self.settings_path)

    self.ui.menu:registerToMainMenu(self)
end

function AiAnki:addToMainMenu(menu_items)
    menu_items.ai_anki_config = {
        text = _("AI-Anki Configuration"),
        callback = function()
            self:showEmailDialog()
        end,
    }
end

function AiAnki:showEmailDialog()
    local current_email = self.settings:readSetting("user_email") or "example@mail.com"

    local email_dialog
    email_dialog = InputDialog:new{
        title = _("Enter Backend Email"),
        input = current_email,
        save_callback = function(val)
            self.settings:saveSetting("user_email", val)
            self.settings:flush()

            UIManager:show(InfoMessage:new{
                text = _("Saved: ") .. val,
                timeout = 1
            })
            UIManager:close(email_dialog)
        end,
        cancel_callback = function()
            UIManager:close(email_dialog)
        end,
    }
    UIManager:show(email_dialog)
    email_dialog:onShowKeyboard()
end

return AiAnki