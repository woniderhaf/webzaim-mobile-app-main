//
//  AppMetrica.swift
//  webzaim
//
//  Created by Slava on 23.03.2023.
//

import Foundation
import YandexMobileMetrica

@objc(AppMetrica)
class AppMetrica : NSObject {
  
  @objc(activate:)
  func activate(_ key: String){
    let configuration = YMMYandexMetricaConfiguration.init(apiKey: key)
    YMMYandexMetrica.activate(with: configuration!)
  }
  
  @objc(reportEvent:parametrs:)
  func reportEvent(_ message:String, parametrs: [String:String]? = nil) {
    
    guard parametrs != nil else {
      YMMYandexMetrica.reportEvent(message, onFailure: { (error) in
        print("DID FAIL REPORT EVENT: %@", message)
        print("REPORT ERROR: %@", error.localizedDescription)
      })
      return
    }
    
    YMMYandexMetrica.reportEvent(message, parameters: parametrs, onFailure: { (error) in
      print("DID FAIL REPORT EVENT: %@", message)
      print("REPORT ERROR: %@", error.localizedDescription)
    })
    
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
