local WidgetContainer = require("ui/widget/container/widgetcontainer")
local SelectionMenu = require("ui/modules/readerselection")
local Device = require("device")

-- We wrap the logic in a Plugin class
local SendToPython = WidgetContainer:extend{
    name = "sendtopython",
}

function SendToPython:onDispatcherReady()
    self:extendSelectionMenu()
end

function SendToPython:extendSelectionMenu()
    SelectionMenu.onShowMenuSignal:register(function(menu)
        -- This ensures we don't add duplicate buttons
        for _, btn in ipairs(menu.buttons) do
            if btn.text == "Send to Python" then return end
        end

        table.insert(menu.buttons, {
            text = "Send to Python",
            callback = function()
                local selected_text = menu.view.selection_text
                self:sendRequest(selected_text)
            end,
        })
    end)
end

function SendToPython:sendRequest(text)
    -- This will show in the terminal/crash.log
    print("Sending to backend: " .. tostring(text))
end

return SendToPython