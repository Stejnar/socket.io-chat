import {store} from '../../store';
import {getAvatarSource} from "../avatars/_locations";

export function dispatchMessageNotification(msg) {
    const state = store.getState();
    const user = state
        .users.find((user) => user.name === msg.from);
    if (user && !state.window.isActive) {
        const notification = new Notification(
            user.name + ' sent a message.',
            {
                body: msg.message,
                icon: getAvatarSource(user.avatar),
            }
        );
        setTimeout(notification.close.bind(notification), 4000);
    }
}