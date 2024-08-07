import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import ClassManagerPage from '../components/ClassManagerPage';
import ClassDetailsPage from '../components/ClassDetailsPage';
// import CreateNewClassModal from '../components/CreateNewClassModal';
import LessonDetailsPage from '../components/LessonDetailsPage/LessonDetailsPage';
import LessonManagerPage from '../components/LessonManagerPage';
import CreateLessonFormPage from '../components/CreateLessonFormPage';
import UpdateLessonFormPage from '../components/UpdateLessonFormPage';
import AssignmentManagerPage from '../components/AssignmentManagerPage';
import AssignmentDetailsPage from '../components/AssignmentDetailsPage';
import CreateAssignmentFormPage from '../components/CreateAssignmentFormPage';
import UpdateAssignmentFormPage from '../components/UpdateAssignmentFormPage';
// import UpdateClassModal from '../components/UpdateClassModal';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      // {
      //   path: "login",
      //   element: <LoginFormPage />,
      // },
      // {
      //   path: "signup",
      //   element: <SignupFormPage />,
      // },
      {
        path: "/classes/:classId",
        element: <ClassDetailsPage />,
      },
      {
        path: "/my-classes",
        element: <ClassManagerPage />,
      },
      {
        path: "/lessons/:lessonId/edit",
        element: <UpdateLessonFormPage />
      },
      {
        path: "/lessons/:lessonId",
        element: <LessonDetailsPage />,
      },
      {
        path: "/my-lessons",
        element: <LessonManagerPage />,
      },
      {
        path: "/create-new-lesson",
        element: <CreateLessonFormPage />
      },
      {
        path: "/assignments/:assignmentId/edit",
        element: <UpdateAssignmentFormPage />
      },
      {
        path: "/assignments/:assignmentId",
        element: <AssignmentDetailsPage />,
      },
      {
        path: "/my-assignments",
        element: <AssignmentManagerPage />,
      },
      {
        path: "/create-new-assignment",
        element: <CreateAssignmentFormPage />
      },
    ],
  },

]);
