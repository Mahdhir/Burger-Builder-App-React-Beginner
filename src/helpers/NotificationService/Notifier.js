import { store } from 'react-notifications-component';

class Notifier {
    
    static addNotification = (title = 'Success', message = 'message', type = 'default', container = 'top-right', duration = 3000, width = 200) => {
        store.addNotification({
            title: title,
            message: message,
            type: type,                         // 'default', 'success', 'info', 'warning'
            container: container,                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: duration
            },
            width: width
        });
    }
}

export default Notifier;