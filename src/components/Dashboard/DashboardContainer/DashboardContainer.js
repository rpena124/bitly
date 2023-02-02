import Sidebar from "../Sidebar/Sidebar"
import UserShortys from "../UsersShortys/UsersShortys"

export default function DashboardContainer () {
    return (
        <div id="my-dashboard-container" className="flex">
            <Sidebar />
            <UserShortys />
        </div>
    )
}