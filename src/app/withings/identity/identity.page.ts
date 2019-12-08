import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Route } from '@angular/compiler/src/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  //issuer: 'https://account.withings.com/oauth2_user/authorize2',
  issuer: 'https://account.withings.com/oauth2_user/authorize2',


  // URL of the SPA to redirect the user to after login
  redirectUri: 'https://sleepexpert.voxte.ch/authorize',
  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  //scope: 'openid profile email voucher',
  //scope: 'user.activity',
  
}

@Component({
  selector: 'app-identity',
  templateUrl: './identity.page.html',
  styleUrls: ['./identity.page.scss'],
})
export class IdentityPage implements OnInit {

  authentication_code : string;

  constructor(private oauthService: OAuthService, private route: ActivatedRoute, private http: HttpClient) { 
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.showDebugInformation = true; 

    // Login-Url
    this.oauthService.loginUrl = "https://account.withings.com/oauth2_user/authorize2"; //Id-Provider?
    this.oauthService.issuer = "https://account.withings.com/oauth2_user/authorize2";
    this.oauthService.tokenEndpoint = "https://account.withings.com/oauth2/token";

    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = "https://sleepexpert.voxte.ch/withings/identity" //window.location.origin + "/index.html";

    // The SPA's id. Register SPA with this id at the auth-server
    this.oauthService.clientId = "75567fc18fe0881c2757206ee375044433a5a76e12f6796d1f300b605683f22d";
    this.oauthService.dummyClientSecret = "cdbed08c93de9bc94afa4dcfbff800f23e818056415f2e17094fb14663eaa119";

    // set the scope for the permissions the client should request
    this.oauthService.scope = "user.activity" //"openid profile email user.activity";
    this.oauthService.customQueryParams = { 'scope': 'user.activity' , 'response_type' : 'code', 'grant_type': 'authorization_code'};
    this.oauthService.responseType = 'code';
    

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);

    // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
    this.oauthService.logoutUrl = "https://account.withings.com/logout";

    // This method just tries to parse the token(s) within the url when
    // the auth-server redirects the user back to the web-app
    // It doesn't send the user the the login page
    //this.oauthService.tryLogin();
  }

public login() {
    //this.oauthService.initLoginFlow();
    this.oauthService.initCodeFlow();
}

public logoff() {
    this.oauthService.logOut();
}

public debug() {
    console.log(this.oauthService.getIdentityClaims());
    this.route.queryParams.subscribe(params => {
      console.log(params.code);
    });
    //this.http.get
    let timestamp : number = new Date().getTime();
    console.log(timestamp);
    let timestamp2 : number = new Date().getUTCSeconds();
    console.log(timestamp2);
}

public get name() {
    let claims : any = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims;
}

ngOnInit() { 
  if (this.route.snapshot.queryParams.code) { 
    console.log("NOW TRYING TO LOG IN TO GET ACCESS TOKEN")
    this.authentication_code = this.route.snapshot.queryParams.code; 
    this.oauthService.tryLogin();
  }
 }
    
}