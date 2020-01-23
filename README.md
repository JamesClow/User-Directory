## Requirements
- List users
- Add new users
- Update existing users
- Delete users
- Clean user experience

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
