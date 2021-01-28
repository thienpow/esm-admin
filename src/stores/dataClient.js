//core 
import { writable, derived, readable } from 'svelte/store';
import {f7} from 'framework7-svelte';
const {AdminApiPromiseClient} = require('../js/adminapi_grpc_web_pb.js');
import {
  // Login
  SignInRequest,
  UserDetail,

  // Common
  ListStatusTypeRequest,

  // User
  ChangePasswordRequest,
  GetUserCountRequest,
  UpdateUserStatusRequest,
  ListUserRequest,
  // Config
  GetConfigRequest,
  UpdateConfigRequest,
  // Rank
  AddRankRequest, 
  UpdateRankRequest, 
  DeleteRankRequest,
  ListRankRequest,
  // Game
  AddGameRequest, 
  UpdateGameRequest, 
  AddGameLeaderRuleRequest,
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
  ListPrizeTypeRequest,
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
  // Winner
  AddWinnerRequest, 
  DeleteWinnerRequest,
  ClaimWinnerRequest,
  GetWinnerCountRequest,
  ListWinnerRequest,
  
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
    userDetail: new UserDetail(),

    // Common
    listStatusTypeRequest: new ListStatusTypeRequest(),
    // User
    changePasswordRequest: new ChangePasswordRequest(),
    updateUserStatusRequest:  new UpdateUserStatusRequest(),
    getUserCountRequest: new GetUserCountRequest(),
    listUserRequest: new ListUserRequest(),

    // Config
    updateConfigRequest:  new UpdateConfigRequest(),
    getConfigRequest: new GetConfigRequest(),

    // Rank
    addRankRequest: new AddRankRequest(),
    updateRankRequest: new UpdateRankRequest(),
    deleteRankRequest: new DeleteRankRequest(),
    listRankRequest: new ListRankRequest(),

    // Game
    addGameRequest: new AddGameRequest(),
    updateGameRequest: new UpdateGameRequest(),
    addGameLeaderRuleRequest: new AddGameLeaderRuleRequest(),
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
    listPrizeTypeRequest: new ListPrizeTypeRequest(),

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

    // Winner
    listWinnerRequest: new ListWinnerRequest(),


    statusTypes: [],
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
      exp: 0
    },
    users: [],
    userCount: {
      total: 0,
      active: 0,
      blocked: 0,
    },

    config: {
      spinner: [],
      invites: 0,
      games_per_ad: 0,
      days_to_claim: 0,
    },

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
      rank: 0,
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
      amount: 0, 
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
      amount: 0, 
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
      timezone: 0,
      scheduled_on: 0,
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
      tournament_ids: [],
      status_prize: 0,
      tickets_collected: 0,
    },
    prizes: [],
    prizeCount: {
      total: 0,
      draft: 0,
      published: 0,
      archived: 0,
    },
    prizeTypes: [],

    tournament: {
      id: 0, 
      title: "", 
      tour_set_ids: [],
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
    tournament_set_game_rules: []
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

      /***
       * User & Login
       */
      async signIn() {
    
        let request = state.sigInRequest;
        request.setUsername(state.username);
        request.setPassword(state.password);
    
        try {
          const response = await state.apiClient.signIn(request);
          //let userDetail = response.getResult();
          //console.log(userDetail);
          if (response.getResult() == "query returned an unexpected number of rows" || response == "Invalid Password.") {
            f7.dialog.alert("Sorry, Invalid Password!", "Error");
          } else {
            state.userDetail = response.getResult();
            state.jwtToken = state.userDetail.getJwtToken();
            state.isLoggedIn = true;
          }   
        } catch (err) {
          f7.dialog.alert(`Error code = ${err.code}, message = "${err.message}"`, "Error");
          console.log(err);
        }
        
        update(state => state);
      },
      
      async getUserCount() {

        let request = state.getUserCountRequest;
        //request.setId(i);
    
        try {
          const response = await state.apiClient.getUserCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.userCount.active = count.getActive();
          state.userCount.blocked = count.getBlocked();
          state.userCount.total = state.userCount.active + state.userCount.blocked;
          
        } catch (err) {
          //console.log(err);
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
          console.log(response);
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
              exp: u.getExp()
            }];
          }
            
        } catch (err) {
          console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }

        update(state => state);
      },

      async updateUserStatus() {

        let request = state.updateUserStatusRequest;
        request.setId(state.user.id);
        request.setStatus(state.user.status);
        
        try {
          const response = await state.apiClient.updateUserStatus(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;

        }
      
        return false;
      },


      /***
       * Config
       */

      async updateConfig() {
        let spinner = state.config.spinner.toString().replace(/\s/g, '').split`,`.map(x=>+x);
        
        let request = state.updateConfigRequest;
        request.setSpinnerList(spinner);
        request.setInvites(state.config.invites);
        request.setGamesPerAd(state.config.games_per_ad);
        request.setDaysToClaim(state.config.days_to_claim);
        
        try {
          const response = await state.apiClient.updateConfig(request, {'authorization': state.jwtToken});
          //console.log(response);
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;

        }
      
        return false;
      },


      async getConfig() {

        let request = state.getConfigRequest;
        
        try {
          const response = await state.apiClient.getConfig(request, {'authorization': state.jwtToken});

          let config =  await response.getResult();
          state.config.spinner =  config.getSpinnerList();
          state.config.invites = config.getInvites();
          state.config.games_per_ad =  config.getGamesPerAd();
          state.config.days_to_claim = config.getDaysToClaim();

        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },


      /***
       * Ranks
       */
      async addRank() {

        let request = state.addRankRequest;
        request.setTitle(state.rank.title);
        request.setExp(state.rank.exp);
        request.setGem(state.rank.gem);
        request.setMultiplier(state.rank.multiplier);
        
        try {
          const response = await state.apiClient.addRank(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
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
        
        try {
          const response = await state.apiClient.addGame(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
        
        try {
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
        request.setRank(state.gameLeaderRule.rank);
        request.setTickets(state.gameLeaderRule.tickets);
        request.setExp(state.gameLeaderRule.exp);
        
        try {
          const response = await state.apiClient.addGameLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        
      },

      async deleteGameLeaderRule(game_id, rank) {

        let request = state.deleteGameLeaderRuleRequest;
        request.setGameId(game_id);
        request.setRank(rank);
        
        try {
          const response = await state.apiClient.deleteGameLeaderRule(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        
      },

      async getGameLeaderRuleList(game_id) {
          
        let request = state.listGameLeaderRuleRequest;
        request.setGameId(game_id);

        try {
          const response = await state.apiClient.listGameLeaderRule(request, {'authorization': state.jwtToken});
          console.log(response);
          state.gameLeaderRules = [];
          for (let g of response.getResultList()) {
            
            state.gameLeaderRules = [...state.gameLeaderRules,  {
              game_id: g.getGameId(), 
              rank: g.getRank(), 
              tickets: g.getTickets(),
              exp: g.getExp(),
            }];
          }
            
        } catch (err) {
          console.log(err);
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
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        
        update(state => state);
      },

      async getGameCount() {

        let request = state.getGameCountRequest;
        //request.setId(i);
    
        try {
          const response = await state.apiClient.getGameCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.gameCount.draft = count.getDraft();
          state.gameCount.published = count.getPublished();
          state.gameCount.archived = count.getArchived();
          state.gameCount.total = state.gameCount.draft + state.gameCount.published + state.gameCount.archived;

        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getGameList(row_count, offset, search_title) {
        let request = state.listGameRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);

        try {
          const response = await state.apiClient.listGame(request, {'authorization': state.jwtToken});
          //console.log(response);
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
            }];
          }
            
        } catch (err) {
          //console.log(err);
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
        request.setAmount(state.item.amount);
        request.setStatus(state.item.status);
        
        try {
          const response = await state.apiClient.addItem(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
        request.setAmount(state.item.amount);
        request.setStatus(state.item.status);
        
        try {
          const response = await state.apiClient.updateItem(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getItemList(row_count, offset, search_title) {
          
        let request = state.listItemRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);

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
              amount: item.getAmount(), 
              status: item.getStatus()
            }];
          }
            
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getItemTypeList() {
        
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
        request.setAmount(state.subscription.amount);
        request.setStatus(state.subscription.status);
        
        try {
          const response = await state.apiClient.addSubscription(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          console.log(err);
          //state.isLoggedIn = false;
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
        request.setAmount(state.subscription.amount);
        request.setStatus(state.subscription.status);
        
        try {
          const response = await state.apiClient.updateSubscription(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        
      },

      async getSubscriptionCount() {

        let request = state.getSubscriptionCountRequest;
        //request.setId(i);
    
        try {
          const response = await state.apiClient.getSubscriptionCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.subscriptionCount.draft = count.getDraft();
          state.subscriptionCount.published = count.getPublished();
          state.subscriptionCount.archived = count.getArchived();
          state.subscriptionCount.total = state.subscriptionCount.draft + state.subscriptionCount.published + state.subscriptionCount.archived;

        } catch (err) {
          console.log(err);
          //state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getSubscriptionList(row_count, offset, search_title) {
          
        let request = state.listSubscriptionRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);

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
              amount: sub.getAmount(), 
              status: sub.getStatus()
            }];
          }
            
        } catch (err) {
          console.log(err);
          //state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      async getSubscriptionTypeList() {
          
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
        let tournament_ids = state.prize.tournament_ids.toString().replace(/\s/g, '').split`,`.map(x=>+x);

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
        request.setScheduledOn([scheduled_on.valueOf() / 1000]);

        request.setIsRepeat(state.prize.is_repeat);
        request.setRepeatedOnList(repeated_on);
        request.setStatus(state.prize.status);
        request.setTournamentIdsList(tournament_ids);
        
        try {
          const response = await state.apiClient.addPrize(request, {'authorization': state.jwtToken});
          //console.log(response)
          return response.getResult() > 0
        } catch (err) {
          console.log(err);
          state.isLoggedIn = false;
        }
        
      },

      async updatePrize() {

        let scheduled_on = new Date(state.prize.scheduled_on);
        let repeated_on = state.prize.repeated_on.toString().replace(/\s/g, '').split`,`.map(x=>+x);
        let tournament_ids = state.prize.tournament_ids.toString().replace(/\s/g, '').split`,`.map(x=>+x);

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
        request.setScheduledOn([scheduled_on.valueOf() / 1000]);

        request.setIsRepeat(state.prize.is_repeat);
        request.setRepeatedOnList(repeated_on);
        request.setStatus(state.prize.status);
        request.setTournamentIdsList(tournament_ids);
        
        try {
          const response = await state.apiClient.updatePrize(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        
      },

      async getPrizeCount() {

        let request = state.getPrizeCountRequest;
        //request.setId(i);
    
        try {
          const response = await state.apiClient.getPrizeCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.prizeCount.draft = count.getDraft();
          state.prizeCount.published = count.getPublished();
          state.prizeCount.archived = count.getArchived();
          state.prizeCount.total = state.prizeCount.draft + state.prizeCount.published + state.prizeCount.archived;
          
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },

      async getPrizeList(row_count, offset, search_title) {
          
        let request = state.listPrizeRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);

        try {
          const response = await state.apiClient.listPrize(request, {'authorization': state.jwtToken});
          //console.log(response);
          state.prizes = [];
          for (let item of response.getResultList()) {
            state.prizes = [...state.prizes,  {
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
              scheduled_on: [timeConverter(item.getScheduledOn())],
              is_repeat: item.getIsRepeat(),
              repeated_on: item.getRepeatedOnList(),
              status: item.getStatus(),
              status_prize: item.getStatusPrize(),
              tickets_collected: item.getTicketsCollected(),
              tournament_ids: item.getTournamentIdsList(),
            }];
          }
            
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },

      
      async getPrizeTypeList() {
        
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


      /***
       * Tournaments
       */
      async addTournament() {

        let tour_set_ids = state.tournament.tour_set_ids.toString().replace(/\s/g, '').split`,`.map(x=>+x);
        let request = state.addTournamentRequest;
        request.setTitle(state.tournament.title);
        request.setTourSetIdsList(tour_set_ids);
        request.setStatus(state.tournament.status);
        
        try {
          const response = await state.apiClient.addTournament(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(response);
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
      },


      async updateTournament() {

        let tour_set_ids = state.tournament.tour_set_ids.toString().replace(/\s/g, '').split`,`.map(x=>+x);
        
        let request = state.updateTournamentRequest;
        request.setId(state.tournament.id);
        request.setTitle(state.tournament.title);
        request.setTourSetIdsList(tour_set_ids);
        request.setStatus(state.tournament.status);
        
        try {
          const response = await state.apiClient.updateTournament(request, {'authorization': state.jwtToken});
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          console.log(response);
          return response.getResult() > 0
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        
      },


      async getTournamentCount() {

        let request = state.getTournamentCountRequest;
        //request.setId(i);
    
        try {
          const response = await state.apiClient.getTournamentCount(request, {'authorization': state.jwtToken});

          let count = await response.getResult();
          state.tournamentCount.draft = count.getDraft();
          state.tournamentCount.published = count.getPublished();
          state.tournamentCount.archived = count.getArchived();
          state.tournamentCount.total = state.tournamentCount.draft + state.tournamentCount.published + state.tournamentCount.archived;
          
        } catch (err) {
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
        
      },


      async getTournamentList(row_count, offset, search_title) {
          
        let request = state.listTournamentRequest;
        request.setLimit(row_count);
        request.setOffset(offset);
        request.setSearchTitle(search_title);

        try {
          const response = await state.apiClient.listTournament(request, {'authorization': state.jwtToken});

          state.tournaments = [];
          for (let item of response.getResultList()) {
            state.tournaments = [...state.tournaments,  {
              id: item.getId(),
              title: item.getTitle(),
              tour_set_ids: item.getTourSetIdsList(),
              status: item.getStatus()
            }];
          }
            
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      async getTournamentSetGameRuleList(id) {
          
        let request = state.listTournamentSetGameRuleRequest;
        request.setId(id);

        try {
          const response = await state.apiClient.listTournamentSetGameRule(request, {'authorization': state.jwtToken});
          //console.log(response);
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
          //console.log(err);
          state.isLoggedIn = false;
        }
        update(state => state);
      
      },


      /***
       * Winners
       */
      async getWinnerList(row_count) {
          
        let request = state.listWinnerRequest;
        request.setLimit(row_count);
        request.setOffset(0);

        try {
          const response = await state.apiClient.listWinner(request, {'authorization': state.jwtToken}); 
          alert(response.getResult());
        } catch (err) {
          //console.log(err);
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
          //console.log(err);
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
          //console.log(err);
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
