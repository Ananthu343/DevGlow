import Notification from "../models/notificationDb.js"

class NotificationRepository {
    async save(notification) {
        const newNotification = new Notification(notification)
        return await newNotification.save()
    }
    async findNotifications(receiver) {
        return await Notification.find({ receiver: receiver }).sort({ createdAt: -1 })
    }
}

export default NotificationRepository