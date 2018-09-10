# Canvas LMS Reorder Dashboard Courses Plug-in

Plugin for the [Canvas LMS theme app](https://github.com/ahsdile/canvas-lms-app) that lets you reorder your courses on the dashboard.

This one is stolen from James Jones' [Canvancement](https://github.com/jamesjonesmath/canvancement/tree/master/dashboard). I rewrote the code but it should be compatible.

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
