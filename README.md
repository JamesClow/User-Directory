## Requirements
- List users
- Add new users
- Update existing users
- Delete users
- Clean user experience

## Target Users
- System Admins

## Assumptions & Goals

Organization may have a lot of users
- Users should be searchable
- Users should be filterable
- Keep tight data density

Users may have a lot of fields
- Display as many fields as possible while keeping user list compact

User’s fields may change
- Allow fields to be customizable

User may not contain complete information
- Make sure to handle edge case

Allow for human error
- Check before user updates are saved
- Check before discarding updates
- Show which fields have been modified

Data should be copiable from list 
- Overflow field when hovering over lengthy text

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
