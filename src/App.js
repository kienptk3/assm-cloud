import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Author from './components/auth/Author'
import AuthContextProvider from './contexts/AuthContext'
import Dasboard from './components/layouts/Dasboard'
import PotectedRoute from './components/protectedRoute/PotectedRoute'
import PostContextProvider from './contexts/PostContext'
import About from './components/layouts/About'
import ProfileProvider from './contexts/ProfileContext'


function App () {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <ProfileProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" render={props => <Author {...props} auth='login' />} />
              <Route exact path="/register" render={ props => <Author {...props} auth='register'/>} />
              <PotectedRoute exact path="/dasboard" component={Dasboard} />
              <PotectedRoute exact path="/about" component={About} />
            </Switch>
          </Router>
        </ProfileProvider>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App
