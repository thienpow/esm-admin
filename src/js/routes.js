
import DashboardPage from '../pages/dashboard.svelte';

import PasswordPage from '../pages/password.svelte';
import UsersPage from '../pages/users.svelte';


import NewGamePage from '../pages/new_game.svelte';
import NewPrizePage from '../pages/new_prize.svelte';
import NewItemPage from '../pages/new_item.svelte';
import NewSubscriptionPage from '../pages/new_subscription.svelte';
import NewTournamentPage from '../pages/new_tournament.svelte';
import NewTournamentFormatSetPage from '../pages/new_tournament_format_set.svelte';

import NewUserPage from '../pages/new_user.svelte';

import NewRankPage from '../pages/new_rank.svelte';

import GamesPage from '../pages/games.svelte';
import PrizesPage from '../pages/prizes.svelte';
import ItemsPage from '../pages/items.svelte';
import SubscriptionsPage from '../pages/subscriptions.svelte';
import RanksPage from '../pages/ranks.svelte';
import ConfigsPage from '../pages/configs.svelte';
import GameLeaderRulePage from '../pages/game_leader_rule.svelte';

import TournamentsPage from '../pages/tournaments.svelte';
import TournamentFormatSetsPage from '../pages/tournament_format_sets.svelte';

import WinnersPage from '../pages/winners.svelte';
import LogPlayPage from '../pages/log_play.svelte';
import LogPrizePoolPage from '../pages/log_prize_pool.svelte';
import UserAddressPage from '../pages/user_address.svelte';
import UserSettingsPage from '../pages/user_settings.svelte';

import SalesPage from '../pages/sales.svelte';
import ClaimsPage from '../pages/claims.svelte';

import NotFoundPage from '../pages/404.svelte';

var routes = [
  {
    path: '/',
    component: DashboardPage,
  },
  {
    path: '/users/',
    component: UsersPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/newuser/:id/',
    component: NewUserPage,
    options: {
      animate: false,
    },
  },
  
  {
    path: '/log_play/',
    component: LogPlayPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/log_prize_pool/',
    component: LogPrizePoolPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/user_address/',
    component: UserAddressPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/user_settings/',
    component: UserSettingsPage,
    options: {
      animate: false,
    }
  },





  // ***** Prizes & Tournaments */
  {
    path: '/newprize/:id/',
    component: NewPrizePage,
    options: {
      animate: false,
    },
  },
  {
    path: '/prizes/',
    component: PrizesPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/newtournament/:id/',
    component: NewTournamentPage,
    options: {
      animate: false,
    },
  },
  {
    path: '/tournaments/',
    component: TournamentsPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/newformatset/:id/',
    component: NewTournamentFormatSetPage,
    options: {
      animate: false,
    },
  },
  {
    path: '/formatsets/',
    component: TournamentFormatSetsPage,
    options: {
      animate: false,
    }
  },

  {
    path: '/newgame/:id/',
    component: NewGamePage,
    options: {
      animate: false,
    },
  },
  {
    path: '/games/',
    component: GamesPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/game_leader_rule/:id/',
    component: GameLeaderRulePage,
    options: {
      animate: false,
    }
  },



  // ***** Shop *****
  {
    path: '/newitem/:id/',
    component: NewItemPage,
    options: {
      animate: false,
    },
  },
  {
    path: '/items/',
    component: ItemsPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/newsub/:id/',
    component: NewSubscriptionPage,
    options: {
      animate: false,
    },
  },
  {
    path: '/subscriptions/',
    component: SubscriptionsPage,
    options: {
      animate: false,
    }
  },




  
  // ***** Configurations *****
  {
    path: '/ranks/',
    component: RanksPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/newrank/:id/',
    component: NewRankPage,
    options: {
      animate: false,
    },
  },
  {
    path: '/configs/',
    component: ConfigsPage,
    options: {
      animate: false,
    }
  },
  





  // ***** Reports *****
  {
    path: '/winners/',
    component: WinnersPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/sales/',
    component: SalesPage,
    options: {
      animate: false,
    }
  },
  {
    path: '/claims/',
    component: ClaimsPage,
    options: {
      animate: false,
    }
  },
  




  // ***** Admin *****
  {
    path: '/password/',
    component: PasswordPage,
    options: {
      animate: false,
    }
  },





  // ***** 404 *****
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
