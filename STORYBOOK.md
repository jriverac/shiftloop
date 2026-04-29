# ShiftLoop Storybook Documentation

This project now includes Storybook for component development and documentation.

## Getting Started

### Running Storybook

To start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006)

### Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

## Available Stories

### Components

#### 1. Graph Component (`/src/components/Graph.stories.js`)
- **Default**: Standard 3-person team with moderate distribution
- **Empty**: Empty state with no team members
- **Perfect Distribution**: Low standard deviation scenario
- **Poor Distribution**: High standard deviation scenario  
- **Large Team**: 7-person team example
- **High Workload**: Team with high mean weekend days
- **Single Person**: Solo worker scenario
- **Two Person Team**: Minimal team setup

#### 2. Tracker Component (`/src/components/Tracker.stories.js`)
- **Default**: Current year view with 4-person team
- **Next 12 Months**: Forward-looking schedule view
- **Small Team**: 2-person team example
- **Large Team**: 6-person team example
- **Short Shifts**: 3-day shift patterns
- **Long Shifts**: 14-day shift patterns
- **Solo Worker**: Single person handling all shifts
- **Empty**: No team members configured
- **Mid Year Start**: Schedule starting mid-year
- **Custom Colors**: Different color schemes

### Application

#### 3. App Component (`/src/App.stories.js`)
- **Default**: Complete ShiftLoop application
- **Dark Background**: App displayed on dark background
- **Documentation**: Detailed application documentation

## Storybook Configuration

### Styling
- Bootstrap CSS is automatically included
- Component-specific CSS files are loaded
- Light background theme is set as default

### Addons Included
- **Controls**: Interactive component property controls
- **Actions**: Event handler logging
- **Docs**: Automatic documentation generation
- **Viewport**: Responsive design testing
- **Backgrounds**: Background color testing

## Development Workflow

1. **Component Development**: Use Storybook to develop components in isolation
2. **Visual Testing**: Test different states and edge cases
3. **Documentation**: Stories serve as living documentation
4. **Collaboration**: Share stories with team members and stakeholders

## Troubleshooting

### Common Issues

1. **$RefreshSig$ is not defined Error**: Fixed by completely disabling React Fast Refresh and providing no-op mocks
2. **Source Map Errors**: Fixed by disabling source maps in webpack config  
3. **React Fast Refresh Issues**: Resolved by removing Create React App preset and using custom webpack configuration
4. **CSS Not Loading**: Ensure all CSS imports are in `.storybook/preview.js`

### Resolution Details

- **React Fast Refresh**: Completely disabled by removing the CRA preset, filtering webpack plugins, and providing mock functions
- **Compatibility**: Uses Babel instead of SWC for better control over compilation
- **Build Process**: Both development and production builds work correctly

### Configuration Files

- `.storybook/main.js`: Main Storybook configuration
- `.storybook/preview.js`: Global decorators and parameters
- Story files: `*.stories.js` files throughout the src directory

## Best Practices

1. **Story Naming**: Use descriptive names that explain the component state
2. **Args Structure**: Provide meaningful default values and controls
3. **Documentation**: Add descriptions for complex components
4. **Edge Cases**: Include empty states and error conditions
5. **Accessibility**: Test with different viewport sizes and themes

## Next Steps

- Add interaction testing with `@storybook/test`
- Implement visual regression testing
- Add more complex user interaction scenarios
- Create shared story templates for consistency