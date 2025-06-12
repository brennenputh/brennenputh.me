+++
title = "Smart Window Resizing in Neovim"
date = 2025-04-12
+++

The last day or two, I've been refitting my Neovim windowing config.
Nothing too wild, just fixing a few warts here and there.
What follows is a few different snippets for different behaviors I wanted.
Hopefully one of these is useful to someone, even if only as a reference (something *definitely* needs said about the Neovim documentation searchability situation).
If you want to see these in their context, links will be left below each example.
The links may fall out of date, so I've linked them to the specific commit.

Also, if you're interested in this, I credit [chrisgrieser](https://github.com/chrisgrieser) who used to run a blog called Nano Tips For Vim, which was immensely helpful to me in figuring out all of my Neovim configs but was sadly taken offline as of 2025-06-12.

## Turn Off Line Numbers for Small Windows

```lua
local set_numbers = function(value, window)
	vim.api.nvim_set_option_value("number", value, { win = window })
	vim.api.nvim_set_option_value("relativenumber", value, { win = window })
end
local window_size_threshold = 40

vim.api.nvim_create_autocmd("WinResized", {
	callback = function()
		for _, win in ipairs(vim.api.nvim_list_wins()) do
			local width = vim.api.nvim_win_get_width(win)
			if width < window_size_threshold then
				set_numbers(false, win)
			else
				set_numbers(true, win)
			end
		end
	end,
})
```
[See it in context!](https://github.com/brennenputh/dotfiles/blob/cf2246d3eea2f0b1a14ca31be448d00a74fe16ae/nvim/lua/autocmds.lua#L67-L86)

## Bring Window Into Focus

```lua
local win_focus = function()
    -- Uncomment if you use either of these plugins
	-- require("dapui").close()
	-- require("nvim-tree.api").tree.close()

	local current_win = vim.api.nvim_get_current_win()
	local windows = vim.api.nvim_list_wins()
	vim.api.nvim_win_set_width(0, vim.o.columns - (#windows * 20))
	for _, win in ipairs(windows) do
		if win ~= current_win then
			vim.api.nvim_win_set_width(win, 20)
		end
	end
end

keymap("n", "<leader>rs", function()
	vim.api.nvim_win_set_width(0, 20)
end)
keymap("n", "<leader>rf", win_focus)
```
[See it in context!](https://github.com/brennenputh/dotfiles/blob/cf2246d3eea2f0b1a14ca31be448d00a74fe16ae/nvim/lua/keymaps.lua#L50-L73)

## Resizing Mappings

This requires the [winresize.nvim](https://github.com/pogyomo/winresize.nvim) plugin.

```lua
local win_resize = function(win, amt, dir)
	return function()
		require("winresize").resize(win, amt, dir)
	end
end

wk_add("<leader>r", "Window Resize")
keymap("n", "<leader>rh", win_resize(0, 10, "left"))
keymap("n", "<leader>rj", win_resize(0, 3, "down"))
keymap("n", "<leader>rk", win_resize(0, 3, "up"))
keymap("n", "<leader>rl", win_resize(0, 10, "right"))
keymap("n", "<leader>r=", "<C-w>=", { desc = "Equalize Windows" })
```
[See it in context!](https://github.com/brennenputh/dotfiles/blob/cf2246d3eea2f0b1a14ca31be448d00a74fe16ae/nvim/lua/keymaps.lua#L43-L68)
