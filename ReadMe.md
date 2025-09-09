# ShiftLoop: On-Call Schedule & Analytics Tool

ShiftLoop is a modern, interactive web app for visualizing and managing on-call schedules for teams. It features a GitHub-style tracking chart, team management, and statistical analysis of weekend call distribution.

## Features

- **Responsive GitHub-style Chart**: Visualize the annual or 12-month on-call schedule, with each day color-coded by team member.
- **Team Management**: Add, remove, reorder team members; assign custom colors.
- **Flexible Controls**:
  - Toggle between "Next 12 Months" and "Specific Start Date" modes
  - Set shift length and include/exclude Fridays
- **Statistical Analysis**:
  - Standard deviation chart (bell curve) of weekend call days per person
  - Table showing each member's weekend call days, mean, and standard deviation
- **Drag-and-Drop**: Reorder team members interactively
- **LocalStorage Persistence**: All settings and team data are saved in your browser

## Usage

1. Open `on-call.html` in your browser.
2. Add team members and assign colors.
3. Adjust controls (date range, shift length, Friday inclusion) as needed.
4. View the schedule chart and bell curve analysis.
5. Drag team members to reorder; remove or add as needed.

## File Structure

- `on-call.html` — Main app (HTML, CSS, JS)
- `ReadMe.md` — Project documentation

## No Dependencies

This project uses only vanilla HTML, CSS, and JavaScript. No frameworks or external libraries required.

## Customization

- All styles are hand-written in the `<style>` block of `on-call.html`.
- You can freely modify the layout, colors, or logic to fit your team's needs.

## License

MIT License. Free for personal and commercial use.

## Author

Created by jrivera. Contributions welcome!
