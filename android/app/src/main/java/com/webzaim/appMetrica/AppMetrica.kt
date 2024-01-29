package com.webzaim.appMetrica

import android.app.Activity
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.yandex.metrica.YandexMetrica
import com.yandex.metrica.YandexMetricaConfig


class AppMetrica(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AppMetrica"
    }

    @ReactMethod
    fun activate(API_key: String) {
        val config = YandexMetricaConfig.newConfigBuilder(API_key).build()
        YandexMetrica.activate(reactContext, config);

        enableActivityAutoTracking()
    }

    private fun enableActivityAutoTracking() {
        val activity: Activity? = currentActivity
        if (activity != null) {
            YandexMetrica.enableActivityAutoTracking(activity.application)
        } else {
            Log.d("AppMetricaCore", "Activity is not attached")
        }
    }

    @ReactMethod
    fun reportEvent(eventName: String?, attributes: ReadableMap?) {
        if (attributes == null) {
            YandexMetrica.reportEvent(eventName!!)
        } else {
            YandexMetrica.reportEvent(eventName!!, attributes.toHashMap())
        }
    }

}