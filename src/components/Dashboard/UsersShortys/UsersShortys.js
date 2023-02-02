import EditShorty from "../EditShorty/EditShorty"
import CreateShorty from "../CreateShorty/CreateShorty"

export default function UsersShortys () {
  return (
    <div className="user-shorty-cont">

      <div className="user-shorty-header">
        <h1>Dashboard</h1>
      </div>

      <div className="flex height100">

        <div className="user-shorty-links">
          <h1>User Shorty's Go Here</h1>
          <CreateShorty />
        </div>
        <div>
          <EditShorty />
        </div>

      </div>

    </div>
  )
}
