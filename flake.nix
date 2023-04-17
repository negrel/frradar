{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { flake-utils, nixpkgs, ... }@inputs:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
            config = {
              allowUnfree = true;
              android_sdk.accept_license = true;
            };
          };
          lib = pkgs.lib;
        in
        {
          devShells = {
            default =
              let
                androidComposition = pkgs.androidenv.composeAndroidPackages
                  {
                    toolsVersion = "26.1.1";
                    platformToolsVersion = "33.0.3";
                    buildToolsVersions = [ "30.0.3" "33.0.0" ];
                    includeEmulator = false;
                    /* emulatorVersion = "31.3.14"; */
                    platformVersions = [ "33" ];
                    includeSources = false;
                    includeSystemImages = false;
                    systemImageTypes = [ "google_apis_playstore" ];
                    abiVersions = [ "armeabi-v7a" "arm64-v8a" ];
                    cmakeVersions = [ "3.22.1" ];
                    includeNDK = true;
                    ndkVersions = [ "23.1.7779620" ];
                    useGoogleAPIs = false;
                    useGoogleTVAddOns = false;
                    includeExtras = [
                      /* "extras;google;gcm" */
                    ];
                  };
              in
              pkgs.mkShell rec {
                buildInputs = with pkgs; [
                  nodejs
                  jdk11
                ];
                JAVA_HOME = pkgs.jdk11;
                ANDROID_HOME = "${androidComposition.androidsdk}/libexec/android-sdk";
                ANDROID_AVD_HOME = (toString ./.) + "/.android/avd";
                LD_LIBRARY_PATH = "${lib.makeLibraryPath buildInputs}";
              };
          };
        });
}

