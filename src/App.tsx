import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react'
import { Session, createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Edit from './pages/Edit';
import { UserContextProvider } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';
import { User } from '@supabase/supabase-js';

setupIonicReact();

const supabase = createClient('https://jwdisfzqcvnwtkoragjg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZGlzZnpxY3Zud3Rrb3JhZ2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NzAwNTksImV4cCI6MjAwNDE0NjA1OX0.Obs7AfaK8qbENWFJBh59VF0DMz9HUkRDOF8qb_8wLog')


const App: React.FC = () => {

  const [session, setSession] = useState<null | Session>(null)

    useEffect(() => {
      supabase.auth.getSession()
      .then(({data: {session}}) => {
        console.log(session)
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {

      return (
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                {session ? <Home session={session} /> : <span>Yo</span>}
              </Route>
              <Route exact path="/edit">
                <Edit />
              </Route>
              <Route exact path="/edit/:id">
                <Edit />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      )
    }
  };

export default App;
