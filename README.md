# Canvas LMS Reorder Dashboard Courses Plug-in

Plugin for the [Canvas LMS theme app](https://github.com/ahsdile/canvas-lms-app) that lets you reorder your courses on the dashboard.

## :warning: DEPRECATED :warning:

Canvas has finally added this functionality in their beta release and will push it to the production environment on
December 8th. This plug-in will then become obsolete.

The new API for this has been available for quite some time but had no effect an had a warning that it was not
finalized yet. For that reason, this plug-in saves its data via the Canvas `custom_data` API instead of the
`dashboard_positions` API. Removing this plug-in from your script will *NOT* remove the old data from Canvas.
Therefore I've created two versions of the scripts that will gradually delete this data as users log in to their
dashboard.

### v0.1.1

This last regular version will keep working and will override the native drag-and-drop behavior when it is released.
Everything stays the same for the users.

### v0.2 

This version will try to read the `custom_data` API and if data exists, will delete it and save it to the new
`dashboard_positions` API. Drag-and-drop will still be handled by this plug-in even when the native functionality
becomes available.

### v0.3

With this version the native functionality becomes active and drag-and-drop will no longer be handled by this plug-in.
However, it will keep trying to delete data from the `custom_data` API.

## Installation

Using NPM:

    npm install @ahsdile/canvas-lms-reorder-dashboard-courses-plugin

Using Yarn:

    yarn add @ahsdile/canvas-lms-reorder-dashboard-courses-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import reorderDashboardCoursesPlugin from '@ahsdile/canvas-lms-reorder-dashboard-courses-plugin';

canvas.addPlugin(reorderDashboardCoursesPlugin);

canvas.run();
```
