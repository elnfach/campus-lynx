

type OnlineStatus =  'online' | 'offline'
type LoggedInStatus = 'logged in' | 'logged out'

export type UserStatus = {
    online: OnlineStatus,
    logged_in: LoggedInStatus,
}