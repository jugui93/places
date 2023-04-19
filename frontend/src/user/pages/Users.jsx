
import UserList from "../components/UsersList";

const Users = () => { 
    const USERS = [
      {
        id: 'u1',
        name: "Juan Morales",
        image:
          "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
        places: 3,
      }
    ];
    return <UserList items={USERS} />  }

export default Users;