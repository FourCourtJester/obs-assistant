// Import core components
import { Container } from 'react-bootstrap'
import { RouterProvider, createHashRouter } from 'react-router-dom'

// Import our components
import { DefaultPage } from './pages'
import { Actions, Editor } from './components'

export default function Page() {
  return (
    <Container className="p-0 m-0 h-100" fluid>
      <RouterProvider
        router={createHashRouter([
          {
            path: '/',
            element: <DefaultPage />,
            children: [
              { index: true, element: <Actions /> },
              {
                path: 'new',
                children: [{ path: 'obs', element: <Editor /> }],
              },
            ],
          },
        ])}
      ></RouterProvider>
    </Container>
  )
}
