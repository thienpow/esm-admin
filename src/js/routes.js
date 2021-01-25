
import DashboardPage from '../pages/dashboard.svelte';

import ProfilePage from '../pages/profile.svelte';
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

import RequestAndLoad from '../pages/request-and-load.svelte';
import NotFoundPage from '../pages/404.svelte';

var routes = [
  {
    path: '/',
    component: DashboardPage,
  },
  {
    path: '/profile/',
    component: ProfilePage,
    options: {
      //transition: 'f7-fade',
    }
  },

  //Basic Data
  {
    path: '/users/',
    component: UsersPage,
    options: {
      //transition: 'f7-fade',
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
    path: '/newrank/:id/',
    component: NewRankPage,
    options: {
      animate: false,
    },
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
      //transition: 'f7-fade',
    }
  },
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
      //transition: 'f7-fade',
    }
  },
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
      //transition: 'f7-fade',
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
      //transition: 'f7-fade',
    }
  },
  {
    path: '/ranks/',
    component: RanksPage,
    options: {
      //transition: 'f7-fade',
    }
  },
  {
    path: '/configs/',
    component: ConfigsPage,
    options: {
      //transition: 'f7-fade',
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
      //transition: 'f7-fade',
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
      //transition: 'f7-fade',
    }
  },
  {
    path: '/winners/',
    component: WinnersPage,
    options: {
      //transition: 'f7-fade',
    }
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
  //Transactions
  {
    path: '/sales/',
    component: SalesPage,
    options: {
      //transition: 'f7-fade',
    }
  },
  {
    path: '/claims/',
    component: ClaimsPage,
    options: {
      //transition: 'f7-fade',
    }
  },
  {
    path: '/game_leader_rule/:id/',
    component: GameLeaderRulePage,
    options: {
      //transition: 'f7-fade',
    }
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
