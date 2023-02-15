import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../types/models/User.model";
import UserService from "../../../Services/UserService";
import { FormikErrors } from "formik";
import UserForm from "../../molecules/UserForm/UserForm";
import { useEffect, useState } from "react";

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  });

  useEffect(() => {
    return () => {
      if (id) {
        UserService.getUserByID(id).then((res) => {
          return setUser(res);
        });
      }
    };
  }, [id]);

  const submitActionHandler = (values: User) => {
    if (id !== undefined) {
      UserService.updateUser(values).then(() => {
        navigate("../users/");
      });
    } else {
      UserService.addUser(values).then(() => {
        navigate("/users");
      });
    }
  };

  return <UserForm user={user} submitActionHandler={submitActionHandler} />;
};
export default UserPage;
