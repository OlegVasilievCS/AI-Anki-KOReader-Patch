local _ = require("gettext")
return {
    name = "sendtopython",
    fullname = _("Send to Python Backend"),
    description = _("Sends selected text to a local Python server."),
    version = "1.0.0", -- Added version field
    enabled = true,
}