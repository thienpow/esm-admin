//core 
import { writable, derived, readable } from 'svelte/store';
import {f7} from 'framework7-svelte';
const {AdminApiPromiseClient} = require('../js/adminapi_grpc_web_pb.js');
import {
  // Login
  SignInRequest,
  GetUserRequest,

  // Common
  ListStatusTypeRequest,
  ListUserStatusTypeRequest,
  ListWinnerStatusTypeRequest,
  ListWinTypeRequest,
  ListTimezonesRequest,

  // User
  ChangePasswordRequest,
  GetUserCountRequest,
  UpdateUserStatusGemBalanceRequest,
  ListUserRequest,
  // Config
  GetConfigRequest,
  UpdateConfigRequest,
  // Spinner Rule
  AddSpinnerRuleRequest, 
  UpdateSpinnerRuleRequest, 
  DeleteSpinnerRuleRequest,
  ListSpinnerRuleRequest,
  // Rank
  AddRankRequest, 
  UpdateRankRequest, 
  DeleteRankRequest,
  ListRankRequest,
  // Game
  AddGameRequest, 
  UpdateGameRequest, 
  AddGameLeaderRuleRequest,
  UpdateGameLeaderRuleRequest,
  DeleteGameLeaderRuleRequest,
  ListGameLeaderRuleRequest,
  DeleteGameRequest,
  GetGameCodeRequest, 
  GetGameCountRequest, 
  ListGameRequest,
  // Item
  AddItemRequest, 
  UpdateItemRequest, 
  DeleteItemRequest,
  GetItemCountRequest, 
  ListItemRequest,
  ListItemTypeRequest,
  // Subscription
  AddSubscriptionRequest, 
  UpdateSubscriptionRequest, 
  DeleteSubscriptionRequest,
  GetSubscriptionCountRequest, 
  ListSubscriptionRequest,
  ListSubscriptionTypeRequest,
  // Prize
  AddPrizeRequest, 
  UpdatePrizeRequest, 
  DeletePrizeRequest,
  GetPrizeCountRequest, 
  ListPrizeRequest,
  ListPrizeTodayRequest,
  ListPrizeTypeRequest,
  AddPrizeTourRequest,
  DeletePrizeTourRequest,
  ListPrizeTourRequest,
  ListPrizePoolRequest,
  // Tournament
  AddTournamentRequest,
  AddTournamentSetRequest,
  AddTournamentSetGameRuleRequest, 
  UpdateTournamentRequest,
  UpdateTournamentSetRequest,
  UpdateTournamentSetGameRuleRequest,
  DeleteTournamentRequest,
  DeleteTournamentSetRequest,
  DeleteTournamentSetGameRuleRequest,
  GetTournamentCountRequest,
  GetTournamentSetCountRequest,
  ListTournamentRequest,
  ListTournamentSetRequest,
  ListTournamentSetGameRuleRequest,
  AddTourSetRequest,
  DeleteTourSetRequest,
  ListTourSetRequest,
  // Winner
  UpdateWinnerRequest,
  GetWinnerCountRequest,
  ListWinnerRequest,
  // GPlayer
  ListLogGRequest,
  // Shop
  ListBuyRequest,
  GetBuyCountRequest,
  
} from '../js/adminapi_pb.js';
//import PreloaderComponent from 'framework7/components/preloader/preloader';


const serviceURL = 'https://esm-api.aadi.my';


function timeConverter(UNIX_timestamp){
  return new Date(UNIX_timestamp * 1000);
}

const dataClient = () => {

	const state = {

    isLoggedIn: false,
    username: "",
    password: "",
    jwtToken: "",


    // Main Api
    apiClient: new AdminApiPromiseClient(serviceURL, null, null),

    // Login
    sigInRequest: new SignInRequest(),
    getUserRequest: new GetUserRequest(),

    // Common
    listStatusTypeRequest: new ListStatusTypeRequest(),
    listUserStatusTypeRequest: new ListUserStatusTypeRequest(),
    listWinnerStatusTypeRequest: new ListWinnerStatusTypeRequest(),
    listWinTypeRequest: new ListWinTypeRequest(),
    listTimezonesRequest: new ListTimezonesRequest(),
    // User
    changePasswordRequest: new ChangePasswordRequest(),
    updateUserStatusGemBalanceRequest:  new UpdateUserStatusGemBalanceRequest(),
    getUserCountRequest: new GetUserCountRequest(),
    listUserRequest: new ListUserRequest(),

    // Config
    updateConfigRequest:  new UpdateConfigRequest(),
    getConfigRequest: new GetConfigRequest(),

    // Spinner Rule
    addSpinnerRuleRequest: new AddSpinnerRuleRequest(),
    updateSpinnerRuleRequest: new UpdateSpinnerRuleRequest(),
    deleteSpinnerRuleRequest: new DeleteSpinnerRuleRequest(),
    listSpinnerRuleRequest: new ListSpinnerRuleRequest(),

    // Rank
    addRankRequest: new AddRankRequest(),
    updateRankRequest: new UpdateRankRequest(),
    deleteRankRequest: new DeleteRankRequest(),
    listRankRequest: new ListRankRequest(),

    // Game
    addGameRequest: new AddGameRequest(),
    updateGameRequest: new UpdateGameRequest(),
    addGameLeaderRuleRequest: new AddGameLeaderRuleRequest(),
    updateGameLeaderRuleRequest: new UpdateGameLeaderRuleRequest(),
    deleteGameLeaderRuleRequest: new DeleteGameLeaderRuleRequest(),
    listGameLeaderRuleRequest: new ListGameLeaderRuleRequest(),
    deleteGameRequest: new DeleteGameRequest(),
    getGameCodeRequest: new GetGameCodeRequest(),
    getGameCountRequest: new GetGameCountRequest(),
    listGameRequest: new ListGameRequest(),

    // Item
    addItemRequest: new AddItemRequest(),
    updateItemRequest: new UpdateItemRequest(),
    deleteItemRequest: new DeleteItemRequest(),
    getItemCountRequest: new GetItemCountRequest(),
    listItemRequest: new ListItemRequest(),
    listItemTypeRequest: new ListItemTypeRequest(),

    // Subscription
    addSubscriptionRequest: new AddSubscriptionRequest(),
    updateSubscriptionRequest: new UpdateSubscriptionRequest(),
    deleteSubscriptionRequest: new DeleteSubscriptionRequest(),
    getSubscriptionCountRequest: new GetSubscriptionCountRequest(),
    listSubscriptionRequest: new ListSubscriptionRequest(),
    listSubscriptionTypeRequest: new ListSubscriptionTypeRequest(),

    // Prize
    addPrizeRequest: new AddPrizeRequest(),
    updatePrizeRequest: new UpdatePrizeRequest(),
    deletePrizeRequest: new DeletePrizeRequest(),
    getPrizeCountRequest: new GetPrizeCountRequest(),
    listPrizeRequest: new ListPrizeRequest(),
    listPrizeTodayRequest: new ListPrizeTodayRequest(),
    listPrizeTypeRequest: new ListPrizeTypeRequest(),
    addPrizeTourRequest: new AddPrizeTourRequest(),
    deletePrizeTourRequest: new DeletePrizeTourRequest(),
    listPrizeTourRequest: new ListPrizeTourRequest(),
    listPrizePoolRequest: new ListPrizePoolRequest(),

    // Tournament
    addTournamentRequest: new AddTournamentRequest(),
    addTournamentSetRequest: new AddTournamentSetRequest(),
    addTournamentSetGameRuleRequest: new AddTournamentSetGameRuleRequest(),
    updateTournamentRequest: new UpdateTournamentRequest(),
    updateTournamentSetRequest: new UpdateTournamentSetRequest(),
    updateTournamentSetGameRuleRequest: new UpdateTournamentSetGameRuleRequest(),
    deleteTournamentRequest: new DeleteTournamentRequest(),
    deleteTournamentSetRequest: new DeleteTournamentSetRequest(),
    deleteTournamentSetGameRuleRequest: new DeleteTournamentSetGameRuleRequest(),
    getTournamentCountRequest: new GetTournamentCountRequest(),
    getTournamentSetCountRequest: new GetTournamentSetCountRequest(),
    listTournamentRequest: new ListTournamentRequest(),
    listTournamentSetRequest: new ListTournamentSetRequest(),
    listTournamentSetGameRuleRequest: new ListTournamentSetGameRuleRequest(),
    addTourSetRequest: new AddTourSetRequest(),
    deleteTourSetRequest: new DeleteTourSetRequest(),
    listTourSetRequest: new ListTourSetRequest(),

    // Winner
    updateWinnerRequest: new UpdateWinnerRequest(),
    listWinnerRequest: new ListWinnerRequest(),
    getWinnerCountRequest: new GetWinnerCountRequest(),

    // GPlayer
    listLogGRequest: new ListLogGRequest(),

    // Shop
    listBuyRequest: new ListBuyRequest(),
    getBuyCountRequest: new GetBuyCountRequest(),


    statusTypes: [],
    userStatusTypes: [],
    winnerStatusTypes: [],
    winTypes: [],
    timezones: [],
    user: {
      id: 0,
      username: "",
      email: "",
      phone: "",
      firstname: "",
      lastname: "",
      created_on: 0,
      last_login: 0,
      role_id: 0,
      status: 0,
      gem_balance: 0,
      social_link_fb: "",
      social_link_google: "",
      avatar_url:  "",
      exp: 0,
      full_name: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      country_code: "",
      is_notify_allowed: "",
      is_notify_new_reward: "",
      is_notify_new_tournament: "",
      is_notify_tour_ending: "",
      nick_name: ""
    },
    users: [],
    userCount: {
      total: 0,
      active: 0,
      blocked: 0,
      pending_delete: 0,
      archived: 0,
    },

    config: {
      invites: 0,
      games_per_ad: 0,
      days_to_claim: 0,
      freespin_per_day: 0,
      gems_per_spins_1: 0,
      ads_per_spins_1: 0,
      gems_per_spins_2: 0,
      ads_per_spins_2: 0,
    },

    spinner_rule: {
      id: 0, 
      probability: 0.0, 
      win: 0.0, 
      type_id: 0
    },
    spinner_rules: [],

    rank: {
      id: 0, 
      title: "", 
      exp: 0, 
      gem: 0, 
      multiplier: 0
    },
    ranks: [],

    game: {
      id: 0, 
      title: "", 
      subtitle: "", 
      img_url: "", 
      content: "", 
      type_id: 0, 
      game_code: "",
      engine_id: 11, 
      version: 0, 
      status: 1,
      score_rule: 0,
      watch_ad_get_tickets: 0,
      watch_ad_get_exp: 0,
      use_gem_get_tickets: 0,
      use_gem_get_exp: 0,
      use_how_many_gems: 0,
    },
    games: [],
    gameCount: {
      total: 0,
      draft: 0,
      published: 0,
      archived: 0,
    },

    gameLeaderRule: {
      game_id:  0,
      rank_from: 0,
      rank_to: 0,
      tickets: 0,
      exp: 0,
    },
    gameLeaderRules: [],

    item: {
      id: 0, 
      title: "", 
      subtitle: "", 
      img_url: "", 
      content: "", 
      type_id: 0, 
      price: 0.0,
      quantity: 0, 
      status: 1
    },
    items: [],
    itemCount: {
      total: 0,
      draft: 0,
      published: 0,
      archived: 0,
    },
    itemTypes: [],

    subscription: {
      id: 0, 
      title: "", 
      subtitle: "", 
      img_url: "", 
      content: "", 
      type_id: 0, 
      price: 0.0,
      quantity: 0, 
      one_time_gem: 0,
      one_time_multiplier: 0,
      one_time_is_firstonly: false,
      daily_gem: 0,
      daily_multiplier: 0,
      status: 1
    },
    subscriptions: [],
    subscriptionCount: {
      total: 0,
      draft: 0,
      published: 0,
      archived: 0,
    },
    subscriptionTypes: [],

    prize: {
      id: 0, 
      title: "", 
      subtitle: "", 
      img_url: "", 
      content: "", 
      type_id: 0, 
      tickets_required: 0,
      duration_days: 0,
      duration_hours: 0,
      timezone: 0.0,
      scheduled_on: 0,
      scheduled_off: 0,
      is_repeat: false,
      repeated_on: [], 
      repeated_on_mon: false,
      repeated_on_tue: false,
      repeated_on_wed: false,
      repeated_on_thu: false,
      repeated_on_fri: false,
      repeated_on_sat: false,
      repeated_on_sun: false,
      status: 1,
      status_progress: 0,
      tickets_collected: 0,
    },
    prizes: [],
    prizeCount: {
      total: 0,
      draft: 0,
      published: 0,
      archived: 0,
    },
    prizeTodays: [],
    prizeToday: {
      prize_id: 0, 
      prize_title: 0,
      status_progress: 0,
      game_id: 0,
      game_title: "",
      tickets_required: 0,
      tickets_collected: 0,
      start_timestamp: 0,
      end_timestamp: 0,
    },
    prizeTypes: [],
    prize_tours: [],
    prizePools: [],
    prize_pool: {
      id: 0,
      prize_id: 0,
      game_id: 0,
      win_from: 0,
      tickets: 0,
      created_on: 0,
      is_closed: false,
    },

    tournament: {
      id: 0, 
      title: "",
      status: 1
    },
    tournaments: [],
    tournamentCount: {
      total: 0,
      draft: 0,
      published: 0,
      archived: 0,
    },
    tournament_set: {
      id: 0, 
      title: "", 
      duration_days: 0,
      duration_hours: 0,
      is_group: false,
    },
    tournament_sets: [],
    tournamentSetCount: {
      total: 0,
    },
    tournament_set_game_rule: {
      id: 0, 
      set_id: 0, 
      game_id: 0,
      duration_days: 0,
      duration_hours: 0,
      duration_minutes: 0,
      group_id: 0,
    },
    tournament_set_game_rules: [],
    tour_sets: [],
    winner: {
      id: 0,
      prize_id: 0,
      prize_title: "",
      prize_img_url: "",
      prize_type_id: 0,
      user_id: 0,
      user_nick_name: "",
      user_avatar_url: "",
      created_on: 0,
      claimed_on: 0,
      status: 0,
      ship_tracking: "",
    },
    winnerCount: {
      total: 0,
      unclaimed: 0,
      claimed: 0,
      delivered: 0,
      expired: 0,
    },
    winners: [],
    logGList: [],
    buys: [],
    buyCount:  {
      subscription: 0,
      item: 0,
    },
    buy: {
      id: 0, 
      item_type_id: 0, 
      item_id: 0, 
      item_title: "", 
      user_id: 0, 
      user_nick_name: "", 
      user_email: "",
      payment_id: 0, 
      price: 0,
      created_on: 0,
    }
	}
	

	const { subscribe, set, update } = writable(0)

	const methods = {

			async init() {
				set(state);
      },

      /***
       * Common
       */

      displayStatusTitle(id) {
        let sT =  state.statusTypes.find(function(s) {
          return s.id == id;
        });

        return sT.title;
      },

      displayUserStatusTitle(id) {
        let sT =  state.userStatusTypes.find(function(s) {
          return s.id == id;
        });

        return sT.title;
      },

      displayWinnerStatusTitle(id) {
        let sT =  state.winnerStatusTypes.find(function(s) {
          return s.id == id;
        });

        return sT.title;
      },

      displayWinTypeTitle(id) {
        let wT =  state.winTypes.find(function(w) {
          return w.id == id;
        });

        return wT.title;
      },

      displayPrizeTypeTitle(id) {
        let pT =  state.prizeTypes.find(function(p) {
          return p.id == id;
        });

        return pT.title;
      },

      displayItemTypeTitle(id) {
        let iT =  state.itemTypes.find(function(i) {
          return i.id == id;
        });

        return iT.title;
      },

      displaySubscriptionTypeTitle(id) {
        let sT =  state.subscriptionTypes.find(function(s) {
          return s.id == id;
        });

        return sT.title;
      },


      async getStatusTypeList() {
        
        if (state.statusTypes.length > 0) {
          return;
        }

        let request = state.listStatusTypeRequest;
        
        try {
          const response = await state.apiClient.listStatusType(request, {'authorization': state.jwtToken});
          state.statusTypes = [];
          for (let s of response.getResultList()) {
            state.statusTypes = [...state.statusTypes,  {
              id: s.getId(), 
              title: s.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getUserStatusTypeList() {
        
        if (state.userStatusTypes.length > 0) {
          return;
        }

        let request = state.listUserStatusTypeRequest;
        
        try {
          const response = await state.apiClient.listUserStatusType(request, {'authorization': state.jwtToken});
          state.userStatusTypes = [];
          for (let s of response.getResultList()) {
            state.userStatusTypes = [...state.userStatusTypes,  {
              id: s.getId(), 
              title: s.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getWinnerStatusTypeList() {
        
        if (state.winnerStatusTypes.length > 0) {
          return;
        }

        let request = state.listWinnerStatusTypeRequest;
        
        try {
          const response = await state.apiClient.listWinnerStatusType(request, {'authorization': state.jwtToken});
          state.winnerStatusTypes = [];
          for (let s of response.getResultList()) {
            state.winnerStatusTypes = [...state.winnerStatusTypes,  {
              id: s.getId(), 
              title: s.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getWinTypeList() {
        
        if (state.winTypes.length > 0) {
          return;
        }

        let request = state.listWinTypeRequest;
        
        try {
          const response = await state.apiClient.listWinType(request, {'authorization': state.jwtToken});
          state.winTypes = [];
          for (let s of response.getResultList()) {
            state.winTypes = [...state.winTypes,  {
              id: s.getId(), 
              title: s.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getTimezonesList() {
        
        if (state.timezones.length > 0) {
          return;
        }

        let request = state.listTimezonesRequest;
        
        try {
          const response = await state.apiClient.listTimezones(request, {'authorization': state.jwtToken});
          state.timezones = [];
          for (let s of response.getResultList()) {
            state.timezones = [...state.timezones,  {
              id: s.getId(), 
              offset: s.getOffset(),
              stext: s.getStext(),
              ltext: s.getLtext()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      /***
       * User & Login
       */
      async signIn() {
    
        let request = state.sigInRequest;
        request.setUsername(state.username);
        request.setPassword(state.password);
    
        try {
          const response = await state.apiClient.signIn(request);
          if (response.getResult() == "query returned an unexpected number of rows" || response == "Invalid Password.") {
            f7.dialog.alert("Sorry, Invalid Password!", "Error");
          } else {
            state.jwtToken = response.getResult().getJwtToken();
            state.isLoggedIn = true;
          }   
        } catch (err) {
          f7.dialog.alert(`Error code = ${err.code}, message = "${err.message}"`, "Error");
        }
        
        update(state => state);
      },

      async getUser(id) {
    
        let request = state.getUserRequest;
        request.setId(id);
    
        try {
          const response = await state.apiClient.getUser(request, {'authorization': state.jwtToken});
          let u = await response.getResult();
          
          state.user = {
            id: u.getId(),
            username: u.getUsername(),
            email: u.getEmail(),
            phone: u.getPhone(),
            firstname: u.getFirstname(),
            lastname: u.getLastname(),
            created_on: u.getCreatedOn(),
            last_login: u.getLastLogin(),
            role_id: u.getRoleId(),
            status: u.getStatus(),
            gem_balance: u.getGemBalance(),
            social_link_fb: u.getSocialLinkFb(),
            social_link_google: u.getSocialLinkGoogle(),
            avatar_url: u.getAvatarUrl(),
            exp: u.getExp(),
            full_name: u.getFullName(),
            address: u.getAddress(),
            city: u.getCity(),
            state: u.getState(),
            zip_code: u.getZipCode(),
            country: u.getCountry(),
            country_code: u.getCountryCode(),
            is_notify_allowed: u.getIsNotifyAllowed(),
            is_notify_new_reward: u.getIsNotifyNewReward(),
            is_notify_new_tournament: u.getIsNotifyNewTournament(),
            is_notify_tour_ending: u.getIsNotifyTourEnding(),
            nick_name: u.getNickName(),
          }
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        
        update(state => state);
      },
      
      async getUserCount() {

        let request = state.getUserCountRequest;
    
        try {
          const response = await state.apiClient.getUserCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.userCount.active = count.getActive();
          state.userCount.blocked = count.getBlocked();
          state.userCount.pending_delete = count.getPendingDelete();
          state.userCount.archived = count.getArchived();
          state.userCount.total = state.userCount.active + state.userCount.blocked + state.userCount.pending_delete + state.userCount.archived;
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getUserList(row_count, offset, search_username) {
          
        let request = state.listUserRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchUsername(search_username);

        try {
          const response = await state.apiClient.listUser(request, {'authorization': state.jwtToken});
          state.users = [];
          for (let u of response.getResultList()) {
            state.users = [...state.users,  {
              id: u.getId(),
              username: u.getUsername(),
              email: u.getEmail(),
              phone: u.getPhone(),
              firstname: u.getFirstname(),
              lastname: u.getLastname(),
              created_on: u.getCreatedOn(),
              last_login: u.getLastLogin(),
              role_id: u.getRoleId(),
              status: u.getStatus(),
              gem_balance: u.getGemBalance(),
              social_link_fb: u.getSocialLinkFb(),
              social_link_google: u.getSocialLinkGoogle(),
              avatar_url: u.getAvatarUrl(),
              exp: u.getExp(),
              full_name: u.getFullName(),
              address: u.getAddress(),
              city: u.getCity(),
              state: u.getState(),
              zip_code: u.getZipCode(),
              country: u.getCountry(),
              country_code: u.getCountryCode(),
              is_notify_allowed: u.getIsNotifyAllowed(),
              is_notify_new_reward: u.getIsNotifyNewReward(),
              is_notify_new_tournament: u.getIsNotifyNewTournament(),
              is_notify_tour_ending: u.getIsNotifyTourEnding(),
              nick_name: u.getNickName()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async changePassword(f7router, old_password, new_password) {

        let request = state.changePasswordRequest;
        request.setUsername(state.username);
        request.setOldPassword(old_password);
        request.setNewPassword(new_password)
    
        try {
          const response = await state.apiClient.changePassword(request, {'authorization': state.jwtToken});
          if (response.getResult() == 1) {
            f7.dialog.alert("Good job! Password Changed Successfully!", "Success");
            f7router.navigate('/');
          } else {
            if (response.getResult() == "Invalid Password.") {
              f7.dialog.alert("Old Password is invalid.  Please try again!", "Error");
            }
          }
        } catch (err) {
          state.isLoggedIn = false;
        }

        update(state => state);
      },

      async updateUserStatusGemBalance() {

        let request = state.updateUserStatusGemBalanceRequest;
        request.setId(state.user.id);
        request.setStatus(state.user.status);
        request.setGemBalance(state.user.gem_balance);
        
        try {
          const response = await state.apiClient.updateUserStatusGemBalance(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },


      /***
       * Config
       */

      async updateConfig() {
        
        let request = state.updateConfigRequest;
        request.setInvites(state.config.invites);
        request.setGamesPerAd(state.config.games_per_ad);
        request.setDaysToClaim(state.config.days_to_claim);
        request.setFreespinPerDay(state.config.freespin_per_day);
        request.setGemsPerSpins1(state.config.gems_per_spins_1);
        request.setAdsPerSpins1(state.config.ads_per_spins_1);
        request.setGemsPerSpins2(state.config.gems_per_spins_2);
        request.setAdsPerSpins2(state.config.ads_per_spins_2);
        
        try {
          const response = await state.apiClient.updateConfig(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },


      async getConfig() {

        let request = state.getConfigRequest;
        
        try {
          const response = await state.apiClient.getConfig(request, {'authorization': state.jwtToken});

          let config =  await response.getResult();
          state.config.invites = config.getInvites();
          state.config.games_per_ad =  config.getGamesPerAd();
          state.config.days_to_claim = config.getDaysToClaim();
          state.config.freespin_per_day = config.getFreespinPerDay();
          state.config.gems_per_spins_1 = config.getGemsPerSpins1();
          state.config.ads_per_spins_1 = config.getAdsPerSpins1();
          state.config.gems_per_spins_2 = config.getGemsPerSpins2();
          state.config.ads_per_spins_2 = config.getAdsPerSpins2();
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      /***
       * Spinner Rule
       */
      async addSpinnerRule() {

        let request = state.addSpinnerRuleRequest;
        request.setProbability(state.spinner_rule.probability);
        request.setWin(state.spinner_rule.win);
        request.setTypeId(state.spinner_rule.type_id);
        
        try {
          const response = await state.apiClient.addSpinnerRule(request, {'authorization': state.jwtToken});
          console.log(response);
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updateSpinnerRule() {

        let request = state.updateSpinnerRuleRequest;
        request.setId(state.spinner_rule.id);
        request.setProbability(state.spinner_rule.probability);
        request.setWin(state.spinner_rule.win);
        request.setTypeId(state.spinner_rule.type_id);

        try {
          const response = await state.apiClient.updateSpinnerRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },

      async deleteSpinnerRule(id) {

        let request = state.deleteSpinnerRuleRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteSpinnerRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getSpinnerRuleList() {
          
        let request = state.listSpinnerRuleRequest;

        try {
          const response = await state.apiClient.listSpinnerRule(request, {'authorization': state.jwtToken});
          state.spinner_rules = [];
          for (let item of response.getResultList()) {
            state.spinner_rules = [...state.spinner_rules,  {
              id: item.getId(), 
              probability: item.getProbability(), 
              win: item.getWin(), 
              type_id: item.getTypeId()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      /***
       * Ranks
       */
      async addRank() {

        let request = state.addRankRequest;
        request.setId(state.rank.id);
        request.setTitle(state.rank.title);
        request.setExp(state.rank.exp);
        request.setGem(state.rank.gem);
        request.setMultiplier(state.rank.multiplier);
        
        try {
          const response = await state.apiClient.addRank(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updateRank() {

        let request = state.updateRankRequest;
        request.setId(state.rank.id);
        request.setTitle(state.rank.title);
        request.setExp(state.rank.exp);
        request.setGem(state.rank.gem);
        request.setMultiplier(state.rank.multiplier);
        
        try {
          const response = await state.apiClient.updateRank(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },

      async deleteRank(id) {

        let request = state.deleteRankRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteRank(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getRankList() {
          
        let request = state.listRankRequest;

        try {
          const response = await state.apiClient.listRank(request, {'authorization': state.jwtToken});

          state.ranks = [];
          for (let item of response.getResultList()) {
            state.ranks = [...state.ranks,  {
              id: item.getId(), 
              title: item.getTitle(), 
              exp: item.getExp(), 
              gem: item.getGem(), 
              multiplier: item.getMultiplier()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      /***
       * Games
       */
      async addGame() {

        let request = state.addGameRequest;
        request.setTitle(state.game.title);
        request.setSubtitle(state.game.subtitle);
        request.setImgUrl(state.game.img_url);
        request.setContent(state.game.content);
        request.setTypeId(state.game.type_id);
        request.setGameCode(state.game.game_code);
        request.setEngineId(state.game.engine_id);
        request.setVersion(state.game.version);
        request.setStatus(state.game.status);
        request.setScoreRule(state.game.score_rule);
        request.setWatchAdGetTickets(state.game.watch_ad_get_tickets);
        request.setWatchAdGetExp(state.game.watch_ad_get_exp);
        request.setUseGemGetTickets(state.game.use_gem_get_tickets);
        request.setUseGemGetExp(state.game.use_gem_get_exp);
        request.setUseHowManyGems(state.game.use_how_many_gems);
        
        try {
          const response = await state.apiClient.addGame(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updateGame() {

        let request = state.updateGameRequest;
        request.setId(state.game.id);
        request.setTitle(state.game.title);
        request.setSubtitle(state.game.subtitle);
        request.setImgUrl(state.game.img_url);
        request.setContent(state.game.content);
        request.setTypeId(state.game.type_id);
        request.setGameCode(state.game.game_code);
        request.setEngineId(state.game.engine_id);
        request.setVersion(state.game.version);
        request.setStatus(state.game.status);
        request.setScoreRule(state.game.score_rule);
        request.setWatchAdGetTickets(state.game.watch_ad_get_tickets);
        request.setWatchAdGetExp(state.game.watch_ad_get_exp);
        request.setUseGemGetTickets(state.game.use_gem_get_tickets);
        request.setUseGemGetExp(state.game.use_gem_get_exp);
        request.setUseHowManyGems(state.game.use_how_many_gems);
        
        try {
          //console.log("updating game...");
          const response = await state.apiClient.updateGame(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;

        }
      
        return false;
      },

      async addGameLeaderRule() {

        let request = state.addGameLeaderRuleRequest;
        request.setGameId(state.gameLeaderRule.game_id);
        request.setRankFrom(state.gameLeaderRule.rank_from);
        request.setRankTo(state.gameLeaderRule.rank_to);
        request.setTickets(state.gameLeaderRule.tickets);
        request.setExp(state.gameLeaderRule.exp);
        
        try {
          const response = await state.apiClient.addGameLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updateGameLeaderRule(rule) {
        //console.log(rule);
        let request = state.updateGameLeaderRuleRequest;
        request.setGameId(rule.game_id);
        request.setRankFrom(state.gameLeaderRule.rank_from);
        request.setRankTo(state.gameLeaderRule.rank_to);
        request.setTickets(rule.tickets);
        request.setExp(rule.exp);
        
        try {
          const response = await state.apiClient.updateGameLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async deleteGameLeaderRule(game_id, rank_from) {

        let request = state.deleteGameLeaderRuleRequest;
        request.setGameId(game_id);
        request.setRankFrom(rank_from);
        
        try {
          const response = await state.apiClient.deleteGameLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getGameLeaderRuleList(game_id) {
          
        let request = state.listGameLeaderRuleRequest;
        request.setGameId(game_id);

        try {
          const response = await state.apiClient.listGameLeaderRule(request, {'authorization': state.jwtToken});
          state.gameLeaderRules = [];
          for (let g of response.getResultList()) {
            
            state.gameLeaderRules = [...state.gameLeaderRules,  {
              game_id: g.getGameId(),
              rank_from: g.getRankFrom(),
              rank_to: g.getRankTo(),
              tickets: g.getTickets(),
              exp: g.getExp(),
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async deleteGame(id) {

        let request = state.deleteGameRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteGame(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getGameCode() {

        let request = state.getGameCodeRequest;
        request.setId(state.game.id);
        
        try {
          const response = await state.apiClient.getGameCode(request, {'authorization': state.jwtToken});
          state.game.game_code = response.getResult();
        } catch (err) {
          state.isLoggedIn = false;
        }
        
        update(state => state);
      },

      async getGameCount() {

        let request = state.getGameCountRequest;
    
        try {
          const response = await state.apiClient.getGameCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.gameCount.draft = count.getDraft();
          state.gameCount.published = count.getPublished();
          state.gameCount.archived = count.getArchived();
          state.gameCount.total = state.gameCount.draft + state.gameCount.published + state.gameCount.archived;

        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getGameList(row_count, offset, search_title, status) {
        let request = state.listGameRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);
        request.setStatus(status);

        try {
          const response = await state.apiClient.listGame(request, {'authorization': state.jwtToken});
          state.games = [];
          for (let g of response.getResultList()) {
            state.games = [...state.games,  {
              id: g.getId(), 
              title: g.getTitle(), 
              subtitle: g.getSubtitle(), 
              img_url: g.getImgUrl(), 
              content: g.getContent(), 
              type_id: g.getTypeId(), 
              game_code: "",
              engine_id: g.getEngineId(), 
              version: g.getVersion(), 
              status: g.getStatus(),
              score_rule: g.getScoreRule(),
              watch_ad_get_tickets: g.getWatchAdGetTickets(),
              watch_ad_get_exp: g.getWatchAdGetExp(),
              use_gem_get_tickets: g.getUseGemGetTickets(),
              use_gem_get_exp: g.getUseGemGetExp(),
              use_how_many_gems: g.getUseHowManyGems(),
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      /***
       * Items
       */
      async addItem() {

        let request = state.addItemRequest;
        request.setTitle(state.item.title);
        request.setSubtitle(state.item.subtitle);
        request.setImgUrl(state.item.img_url);
        request.setContent(state.item.content);
        request.setTypeId(state.item.type_id);
        request.setPrice(state.item.price);
        request.setQuantity(state.item.quantity);
        request.setStatus(state.item.status);
        
        try {
          const response = await state.apiClient.addItem(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updateItem() {

        let request = state.updateItemRequest;
        request.setId(state.item.id);
        request.setTitle(state.item.title);
        request.setSubtitle(state.item.subtitle);
        request.setImgUrl(state.item.img_url);
        request.setContent(state.item.content);
        request.setTypeId(state.item.type_id);
        request.setPrice(state.item.price);
        request.setQuantity(state.item.quantity);
        request.setStatus(state.item.status);
        
        try {
          const response = await state.apiClient.updateItem(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },

      async deleteItem(id) {

        let request = state.deleteItemRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteItem(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getItemCount() {

        let request = state.getItemCountRequest;
        //request.setId(i);
    
        try {
          const response = await state.apiClient.getItemCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.itemCount.draft = count.getDraft();
          state.itemCount.published = count.getPublished();
          state.itemCount.archived = count.getArchived();
          state.itemCount.total = state.itemCount.draft + state.itemCount.published + state.itemCount.archived;
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getItemList(row_count, offset, search_title, status) {
          
        let request = state.listItemRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);
        request.setStatus(status);

        try {
          const response = await state.apiClient.listItem(request, {'authorization': state.jwtToken});

          state.items = [];
          for (let item of response.getResultList()) {
            state.items = [...state.items,  {
              id: item.getId(), 
              title: item.getTitle(), 
              subtitle: item.getSubtitle(), 
              img_url: item.getImgUrl(), 
              content: item.getContent(), 
              type_id: item.getTypeId(), 
              price: item.getPrice(),
              quantity: item.getQuantity(), 
              status: item.getStatus()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getItemTypeList() {
        
        if (state.itemTypes.length > 0) {
          return;
        }
          

        let request = state.listItemTypeRequest;
        
        try {
          const response = await state.apiClient.listItemType(request, {'authorization': state.jwtToken});
          state.itemTypes = [];
          for (let t of response.getResultList()) {
            state.itemTypes = [...state.itemTypes,  {
              id: t.getId(), 
              title: t.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      /***
       * Subscriptions
       */
      async addSubscription() {

        let request = state.addSubscriptionRequest;
        request.setTitle(state.subscription.title);
        request.setSubtitle(state.subscription.subtitle);
        request.setImgUrl(state.subscription.img_url);
        request.setContent(state.subscription.content);
        request.setTypeId(state.subscription.type_id);
        request.setPrice(state.subscription.price);
        request.setQuantity(state.subscription.quantity);
        request.setOneTimeGem(state.subscription.one_time_gem);
        request.setOneTimeMultiplier(state.subscription.one_time_multiplier);
        request.setOneTimeIsFirstonly(state.subscription.one_time_is_firstonly);
        request.setDailyGem(state.subscription.daily_gem);
        request.setDailyMultiplier(state.subscription.daily_multiplier);
        request.setStatus(state.subscription.status);
        
        try {
          const response = await state.apiClient.addSubscription(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updateSubscription() {

        let request = state.updateSubscriptionRequest;
        request.setId(state.subscription.id);
        request.setTitle(state.subscription.title);
        request.setSubtitle(state.subscription.subtitle);
        request.setImgUrl(state.subscription.img_url);
        request.setContent(state.subscription.content);
        request.setTypeId(state.subscription.type_id);
        request.setPrice(state.subscription.price);
        request.setQuantity(state.subscription.quantity);
        request.setOneTimeGem(state.subscription.one_time_gem);
        request.setOneTimeMultiplier(state.subscription.one_time_multiplier);
        request.setOneTimeIsFirstonly(state.subscription.one_time_is_firstonly);
        request.setDailyGem(state.subscription.daily_gem);
        request.setDailyMultiplier(state.subscription.daily_multiplier);

        request.setStatus(state.subscription.status);
        
        try {
          const response = await state.apiClient.updateSubscription(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },

      async deleteSubscription(id) {

        let request = state.deleteSubscriptionRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteSubscription(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getSubscriptionCount() {

        let request = state.getSubscriptionCountRequest;
    
        try {
          const response = await state.apiClient.getSubscriptionCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.subscriptionCount.draft = count.getDraft();
          state.subscriptionCount.published = count.getPublished();
          state.subscriptionCount.archived = count.getArchived();
          state.subscriptionCount.total = state.subscriptionCount.draft + state.subscriptionCount.published + state.subscriptionCount.archived;

        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getSubscriptionList(row_count, offset, search_title, status) {
          
        let request = state.listSubscriptionRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);
        request.setStatus(status);

        try {
          const response = await state.apiClient.listSubscription(request, {'authorization': state.jwtToken});

          state.subscriptions = [];
          for (let sub of response.getResultList()) {
            state.subscriptions = [...state.subscriptions,  {
              id: sub.getId(), 
              title: sub.getTitle(), 
              subtitle: sub.getSubtitle(), 
              img_url: sub.getImgUrl(), 
              content: sub.getContent(), 
              type_id: sub.getTypeId(), 
              price: sub.getPrice(),
              quantity: sub.getQuantity(),
              one_time_gem: sub.getOneTimeGem(),
              one_time_multiplier: sub.getOneTimeMultiplier(),
              one_time_is_firstonly: sub.getOneTimeIsFirstonly(),
              daily_gem: sub.getDailyGem(),
              daily_multiplier: sub.getDailyMultiplier(),
              status: sub.getStatus()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getSubscriptionTypeList() {
        
        if (state.subscriptionTypes.length > 0) {
          return;
        }

        let request = state.listSubscriptionTypeRequest;

        try {
          const response = await state.apiClient.listSubscriptionType(request, {'authorization': state.jwtToken});
          state.subscriptionTypes = [];
          for (let s of response.getResultList()) {
            state.subscriptionTypes = [...state.subscriptionTypes,  {
              id: s.getId(), 
              title: s.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      /***
       * Prizes
       */
      async addPrize() {

      
        let scheduled_on = new Date(state.prize.scheduled_on);
        let repeated_on = state.prize.repeated_on.toString().replace(/\s/g, '').split`,`.map(x=>+x);

        let request = state.addPrizeRequest;
        request.setTitle(state.prize.title);
        request.setSubtitle(state.prize.subtitle);
        request.setImgUrl(state.prize.img_url);
        request.setContent(state.prize.content);

        request.setTypeId(state.prize.type_id);
        request.setTicketsRequired(state.prize.tickets_required);
        request.setDurationDays(state.prize.duration_days);
        request.setDurationHours(state.prize.duration_hours);

        request.setTimezone(state.prize.timezone);
        request.setScheduledOn(scheduled_on.valueOf() / 1000);

        request.setIsRepeat(state.prize.is_repeat);
        request.setRepeatedOnList(repeated_on);
        request.setStatus(state.prize.status);
        
        try {
          const response = await state.apiClient.addPrize(request, {'authorization': state.jwtToken});
          return response.getResult();
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async updatePrize() {

        let scheduled_on = new Date(state.prize.scheduled_on);
        let repeated_on = state.prize.repeated_on.toString().replace(/\s/g, '').split`,`.map(x=>+x);

        let request = state.updatePrizeRequest;
        request.setId(state.prize.id);
        request.setTitle(state.prize.title);
        request.setSubtitle(state.prize.subtitle);
        request.setImgUrl(state.prize.img_url);
        request.setContent(state.prize.content);

        request.setTypeId(state.prize.type_id);
        request.setTicketsRequired(state.prize.tickets_required);
        request.setDurationDays(state.prize.duration_days);
        request.setDurationHours(state.prize.duration_hours);

        request.setTimezone(state.prize.timezone);
        request.setScheduledOn(scheduled_on.valueOf() / 1000);

        request.setIsRepeat(state.prize.is_repeat);
        request.setRepeatedOnList(repeated_on);
        request.setStatus(state.prize.status);
        
        try {
          const response = await state.apiClient.updatePrize(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
      
        return false;
      },

      async deletePrize(id) {

        let request = state.deletePrizeRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deletePrize(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getPrizeCount() {

        let request = state.getPrizeCountRequest;
    
        try {
          const response = await state.apiClient.getPrizeCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.prizeCount.draft = count.getDraft();
          state.prizeCount.published = count.getPublished();
          state.prizeCount.archived = count.getArchived();
          state.prizeCount.total = state.prizeCount.draft + state.prizeCount.published + state.prizeCount.archived;
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getPrizeList(row_count, offset, search_title, status) {
          
        let request = state.listPrizeRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);
        request.setStatus(status);

        try {
          const response = await state.apiClient.listPrize(request, {'authorization': state.jwtToken});
          state.prizes = [];
          for (let item of response.getResultList()) {
            state.prizes = [...state.prizes, {
              id: item.getId(), 
              title: item.getTitle(), 
              subtitle: item.getSubtitle(), 
              img_url: item.getImgUrl(), 
              content: item.getContent(),
              type_id: item.getTypeId(), 
              tickets_required: item.getTicketsRequired(),
              duration_days: item.getDurationDays(),
              duration_hours: item.getDurationHours(),
              timezone: item.getTimezone(),
              scheduled_on: timeConverter(item.getScheduledOn()),
              scheduled_off: timeConverter(item.getScheduledOff()),
              is_repeat: item.getIsRepeat(),
              repeated_on: item.getRepeatedOnList(),
              status: item.getStatus(),
              status_progress: item.getStatusProgress(),
              tickets_collected: item.getTicketsCollected(),
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getPrizeTodayList() {
        
        let request = state.listPrizeTodayRequest;
        
        try {
          const response = await state.apiClient.listPrizeToday(request, {'authorization': state.jwtToken});
          state.prizeTodays = [];
          for (let p of response.getResultList()) {
            state.prizeTodays = [...state.prizeTodays,  {
              prize_id: p.getPrizeId(), 
              prize_title: p.getPrizeTitle(),
              status_progress: p.getStatusProgress(),
              game_id: p.getGameId(),
              game_title: p.getGameTitle(),
              tickets_required: p.getTicketsRequired(),
              tickets_collected: p.getTicketsCollected(),
              start_timestamp: timeConverter(p.getStartTimestamp()),
              end_timestamp: timeConverter(p.getEndTimestamp()),
            }];
          }
            
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getPrizeTypeList() {
        
        if (state.prizeTypes.length > 0) {
          return;
        }

        let request = state.listPrizeTypeRequest;
        
        try {
          const response = await state.apiClient.listPrizeType(request, {'authorization': state.jwtToken});
          state.prizeTypes = [];
          for (let p of response.getResultList()) {
            state.prizeTypes = [...state.prizeTypes,  {
              id: p.getId(), 
              title: p.getTitle()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async addPrizeTour(prize_id, tour_id) {

        let request = state.addPrizeTourRequest;
        request.setPrizeId(prize_id);
        request.setTourId(tour_id);
        
        try {
          const response = await state.apiClient.addPrizeTour(request, {'authorization': state.jwtToken});
          return response.getResult()
        } catch (err) {
          state.isLoggedIn = false;
        }
      },

      async deletePrizeTour(id) {

        let request = state.deletePrizeTourRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deletePrizeTour(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getPrizeTourList(id) {
          
        let request = state.listPrizeTourRequest;
        request.setId(id);

        try {
          const response = await state.apiClient.listPrizeTour(request, {'authorization': state.jwtToken});
          state.prize_tours = [];
          for (let item of response.getResultList()) {
            state.prize_tours = [...state.prize_tours,  {
              id: item.getId(),
              prize_id: item.getPrizeId(),
              tour_id: item.getTourId(),
              tour_title: item.getTourTitle(),
              status: item.getStatus()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      async getPrizePoolList(user_id) {
          
        let request = state.listPrizePoolRequest;
        request.setUserId(user_id);

        try {
          const response = await state.apiClient.listPrizePool(request, {'authorization': state.jwtToken});
          state.prizePools = [];
          for (let item of response.getResultList()) {
            state.prizePools = [...state.prizePools,  {
              id: item.getId(),
              prize_id: item.getPrizeId(),
              game_id: item.getGameId(),
              win_from: item.getWinFrom(),
              tickets: item.getTickets(),
              created_on: timeConverter(item.getCreatedOn()),
              is_closed: item.getIsClosed(),
            }];
          }
            
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      /***
       * Tournaments
       */
      async addTournament() {

        let request = state.addTournamentRequest;
        request.setTitle(state.tournament.title);
        request.setStatus(state.tournament.status);
        
        try {
          const response = await state.apiClient.addTournament(request, {'authorization': state.jwtToken});
          return response.getResult();
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async addTournamentSet() {

        let request = state.addTournamentSetRequest;
        request.setTitle(state.tournament_set.title);
        request.setDurationDays(state.tournament_set.duration_days);
        request.setDurationHours(state.tournament_set.duration_hours);
        request.setIsGroup(state.tournament_set.is_group);
        
        try {
          const response = await state.apiClient.addTournamentSet(request, {'authorization': state.jwtToken});
          return response.getResult();
        } catch (err) {
          state.isLoggedIn = false;
        }
      },


      async addTournamentSetGameRule(set_id, game_id, duration_days, duration_hours, duration_minutes, group_id) {

        let request = state.addTournamentSetGameRuleRequest;
        request.setSetId(set_id);
        request.setGameId(game_id);
        request.setDurationDays(duration_days);
        request.setDurationHours(duration_hours);
        request.setDurationMinutes(duration_minutes);
        request.setGroupId(group_id);
        
        try {
          const response = await state.apiClient.addTournamentSetGameRule(request, {'authorization': state.jwtToken});
          return response.getResult()
        } catch (err) {
          state.isLoggedIn = false;
        }
      },


      async updateTournament() {

        let request = state.updateTournamentRequest;
        request.setId(state.tournament.id);
        request.setTitle(state.tournament.title);
        request.setStatus(state.tournament.status);
        
        try {
          const response = await state.apiClient.updateTournament(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
      },


      async updateTournamentSet() {

        let request = state.updateTournamentSetRequest;
        request.setId(state.tournament_set.id);
        request.setTitle(state.tournament_set.title);
        request.setDurationDays(state.tournament_set.duration_days);
        request.setDurationHours(state.tournament_set.duration_hours);
        request.setIsGroup(state.tournament_set.is_group);
        
        try {
          const response = await state.apiClient.updateTournamentSet(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
      },


      async updateTournamentSetGameRule() {

        let request = state.updateTournamentSetGameRuleRequest;
        request.setId(state.tournament_set_game_rule.id);
        request.setSetId(state.tournament_set_game_rule.set_id);
        request.setGameId(state.tournament_set_game_rule.game_id);
        request.setDurationDays(state.tournament_set_game_rule.duration_days);
        request.setDurationHours(state.tournament_set_game_rule.duration_hours);
        request.setDurationMinutes(state.tournament_set_game_rule.duration_minutes);
        request.setGroupId(state.tournament_set_game_rule.group_id);
        
        try {
          const response = await state.apiClient.updateTournamentSetGameRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
      },


      async deleteTournament(id) {

        let request = state.deleteTournamentRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteTournament(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },


      async deleteTournamentSet(id) {

        let request = state.deleteTournamentSetRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteTournamentSet(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },


      async deleteTournamentSetGameRule(id) {

        let request = state.deleteTournamentSetGameRuleRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteTournamentSetGameRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },


      async getTournamentCount() {

        let request = state.getTournamentCountRequest;
    
        try {
          const response = await state.apiClient.getTournamentCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.tournamentCount.draft = count.getDraft();
          state.tournamentCount.published = count.getPublished();
          state.tournamentCount.archived = count.getArchived();
          state.tournamentCount.total = state.tournamentCount.draft + state.tournamentCount.published + state.tournamentCount.archived;
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },


      async getTournamentList(row_count, offset, search_title, status) {
          
        let request = state.listTournamentRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);
        request.setStatus(status);

        try {
          const response = await state.apiClient.listTournament(request, {'authorization': state.jwtToken});

          state.tournaments = [];
          for (let item of response.getResultList()) {
            state.tournaments = [...state.tournaments,  {
              id: item.getId(),
              title: item.getTitle(),
              status: item.getStatus()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      async getTournamentSetCount() {

        let request = state.getTournamentSetCountRequest;
    
        try {
          const response = await state.apiClient.getTournamentSetCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.tournamentSetCount.total = count.getTotal();
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getTournamentSetList(row_count, offset, search_title) {
          
        let request = state.listTournamentSetRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);

        try {
          const response = await state.apiClient.listTournamentSet(request, {'authorization': state.jwtToken});

          state.tournament_sets = [];
          for (let item of response.getResultList()) {
            state.tournament_sets = [...state.tournament_sets,  {
              id: item.getId(),
              title: item.getTitle(),
              duration_days: item.getDurationDays(),
              duration_hours: item.getDurationHours(),
              is_group: item.getIsGroup()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      async getTournamentSetGameRuleList(id) {
          
        let request = state.listTournamentSetGameRuleRequest;
        request.setId(id);

        try {
          const response = await state.apiClient.listTournamentSetGameRule(request, {'authorization': state.jwtToken});
          state.tournament_set_game_rules = [];
          for (let item of response.getResultList()) {
            state.tournament_set_game_rules = [...state.tournament_set_game_rules,  {
              id: item.getId(),
              set_id: item.getSetId(),
              game_id: item.getGameId(),
              duration_days: item.getDurationDays(),
              duration_hours: item.getDurationHours(),
              duration_minutes: item.getDurationMinutes(),
              group_id: item.getGroupId()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async addTourSet(tour_id, set_id) {

        let request = state.addTourSetRequest;
        request.setTourId(tour_id);
        request.setSetId(set_id);
        
        try {
          const response = await state.apiClient.addTourSet(request, {'authorization': state.jwtToken});
          return response.getResult()
        } catch (err) {
          state.isLoggedIn = false;
        }
      },

      async deleteTourSet(id) {

        let request = state.deleteTourSetRequest;
        request.setId(id);
        
        try {
          const response = await state.apiClient.deleteTourSet(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getTourSetList(id) {
          
        let request = state.listTourSetRequest;
        request.setId(id);

        try {
          const response = await state.apiClient.listTourSet(request, {'authorization': state.jwtToken});
          state.tour_sets = [];
          for (let item of response.getResultList()) {
            state.tour_sets = [...state.tour_sets,  {
              id: item.getId(),
              tour_id: item.getTourId(),
              set_id: item.getSetId(),
              set_title: item.getSetTitle(),
              status: item.getStatus()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      /***
       * Winners
       */

       async updateWinner() {

        let request = state.updateWinnerRequest;
        request.setId(state.winner.id);
        request.setStatus(state.winner.status);
        request.setShipTracking(state.winner.ship_tracking);
        
        try {
          const response = await state.apiClient.updateWinner(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;

        }
      
        return false;
      },

      async getWinnerList(row_count, offset, search_title, status) {
          
        let request = state.listWinnerRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);
        request.setStatus(status);

        try {
          const response = await state.apiClient.listWinner(request, {'authorization': state.jwtToken}); 

          state.winners = [];
          for (let item of response.getResultList()) {
            state.winners = [...state.winners,  {
              id: item.getId(),
              prize_id: item.getPrizeId(),
              prize_title: item.getPrizeTitle(),
              prize_img_url: item.getPrizeImgUrl(),
              prize_type_id: item.getPrizeTypeId(),
              user_id: item.getUserId(),
              user_nick_name: item.getUserNickName(),
              user_avatar_url: item.getUserAvatarUrl(),
              created_on: timeConverter(item.getCreatedOn()),
              claimed_on: timeConverter(item.getClaimedOn()),
              status: item.getStatus(),
              ship_tracking: item.getShipTracking()
            }];
          }
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getWinnerCount() {

        let request = state.getWinnerCountRequest;
    
        try {
          const response = await state.apiClient.getWinnerCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.winnerCount.unclaimed = count.getUnclaimed();
          state.winnerCount.claimed = count.getClaimed();
          state.winnerCount.delivered = count.getDelivered();
          state.winnerCount.expired = count.getExpired();
          state.winnerCount.total = state.winnerCount.unclaimed + state.winnerCount.claimed + state.winnerCount.delivered + state.winnerCount.expired;
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },



      async addLeaderRule() {

        let request = state.addLeaderRuleRequest;
        request.setRank(state.leaderRule.rank);
        request.setTickets(state.leaderRule.tickets);
        
        try {
          const response = await state.apiClient.addLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async deleteLeaderRule(rank) {

        let request = state.deleteLeaderRuleRequest;
        request.setRank(rank);
        
        try {
          const response = await state.apiClient.deleteLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          state.isLoggedIn = false;
        }
        
      },

      async getLeaderRuleList() {
          
        let request = state.listLeaderRuleRequest;
        
        try {
          const response = await state.apiClient.listLeaderRule(request, {'authorization': state.jwtToken});

          state.leaderRules = [];
          for (let g of response.getResultList()) {
            state.leaderRules = [...state.leaderRules,  {
              rank: g.getRank(), 
              tickets: g.getTickets()
            }];
          }
            
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      /***
       * GPlayer
       */
       async getLogGList(user_id, row_count) {
          
        let request = state.listLogGRequest;
        request.setUserId(user_id)
        request.setLimit(row_count);
        request.setOffset(0);

        try {
          const response = await state.apiClient.listLogG(request, {'authorization': state.jwtToken}); 

          state.logGList = [];
          for (let l of response.getResultList()) {
            state.logGList = [...state.logGList,  {
              id: l.getId(),
              game_id: l.getGameId(), 
              prize_id: l.getPrizeId(),
              enter_timestamp: timeConverter(l.getEnterTimestamp()),
              leave_timestamp: timeConverter(l.getLeaveTimestamp()),
              is_watched_ad: l.getIsWatchedAd(),
              is_used_gem: l.getIsUsedGem(),
              game_score: l.getGameScore(),
            }];
          }
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      /***
       * Shop
       */

       async getBuyCount() {

        let request = state.getBuyCountRequest;
    
        try {
          const response = await state.apiClient.getBuyCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.buyCount.subscription = count.getSubscription();
          state.buyCount.item = count.getItem();
          state.buyCount.total = state.buyCount.subscription + state.buyCount.item;
          
        } catch (err) {
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getBuyList(row_count, offset, search_title) {
          
        let request = state.listBuyRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        //request.setSearchTitle(search_title);

        try {
          const response = await state.apiClient.listBuy(request, {'authorization': state.jwtToken});

          state.buys = [];
          for (let item of response.getResultList()) {
            state.buys = [...state.buys,  {
              id: item.getId(), 
              item_type_id: item.getItemTypeId(), 
              item_id: item.getItemId(), 
              item_title: item.getItemTitle(), 
              user_id: item.getUserId(), 
              user_nick_name: item.getUserNickName(), 
              user_email: item.getUserEmail(),
              payment_id: item.getPaymentId(), 
              price: item.getPrice(),
              created_on: timeConverter(item.getCreatedOn())
            }];
          }

        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        
        update(state => state);
      
      },
	}

	return {
		subscribe,
		set,
		update,
		...methods,
	};
}


export default dataClient()
