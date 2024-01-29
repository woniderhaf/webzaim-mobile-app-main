//
//  AppMetrica.m
//  webzaim
//
//  Created by Slava on 23.03.2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AppMetrica, NSObject)
RCT_EXTERN_METHOD(activate: (NSString *)key)
RCT_EXTERN_METHOD(reportEvent: (NSString *)message parametrs:( NSDictionary *)parametrs )

@end
