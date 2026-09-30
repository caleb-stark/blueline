import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import DashboardPage from "../pages/DashboardPage"
import GamesPage from "../pages/GamesPage"
import ScoresPage from "../pages/ScoresPage"
import StandingsPage from "../pages/StandingsPage"
import GameDetailsPage from "../pages/GameDetailsPage"
import TeamsPage from "../pages/TeamsPage"
import TeamDetailsPage from "../pages/TeamDetailsPage"
import PlayerDetailsPage from "../pages/PlayerDetailsPage"

const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout />,
    children:[
      {
        index:true,
        element:<DashboardPage />
      },
      {
        path:"games",
        element:<GamesPage />
      },
      {
        path:"games/:gameId",
        element:<GameDetailsPage />
      },
      {
        path:"scores",
        element:<ScoresPage />
      },
      {
        path:"standings",
        element:<StandingsPage />
      },
      {
        path:"teams",
        element:<TeamsPage />
      },
      {
        path:"teams/:teamAbbrev",
        element:<TeamDetailsPage />
      },
      {
        path:"players/:playerId",
        element:<PlayerDetailsPage />
      }
    ]
  }
])

export default router