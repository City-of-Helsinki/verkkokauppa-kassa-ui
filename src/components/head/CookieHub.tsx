import {Helmet} from "react-helmet";


export const CookieHub = () => {

  return (
    (function () {
      let cookieHubScript: string
      let cookieHubSrc = ''
      if (process.env.NODE_ENV === "development"){
        cookieHubSrc = 'https://dash.cookiehub.com/dev/fcf5a8d2.js'
      }

      if (process.env.NODE_ENV === "production"){
        cookieHubSrc = 'https://cookiehub.net/c2/fcf5a8d2.js'
      }

      cookieHubScript = `
        // Handle updating the URL.
        let url = new URL(window.location.href);
        var cpm = {
        language: url.searchParams.get('lang') || 'fi',
        onInitialise: function(status) {
          if (!this.hasConsented('analytics')) {
              //console.log('The analytics category is not allowed');
              const now = new Date();
              var numberOfDays = 365
              var key = '_hjOptOut'
              var value = 'true'
              // set the time to be now + numberOfDays
              now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
              var expires = now.toUTCString()
              document.cookie = key + '=' + value + '; expires=' + expires + '; path=/';
          }
        },
        onStatusChange: function(status, previousStatus)
        {
          if (this.hasConsented("analytics")) {
            //console.log('The analytics category is allowed');
            var value = 'false'
          }else {
            //console.log('The analytics category is not allowed');
            var value = 'true'
          }
          const now = new Date();
          var numberOfDays = 365
          var key = '_hjOptOut'
          
          // set the time to be now + numberOfDays
          now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
          var expires = now.toUTCString()
          document.cookie = key + '=' + value + '; expires=' + expires + '; path=/';
        },
        onAllow: function(category) {
          if (category == 'analytics') {
            //console.log('The analytics category was just allowed');
              const now = new Date();
              var numberOfDays = 365
              var key = '_hjOptOut'
              var value = 'false'
              // set the time to be now + numberOfDays
              now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
              var expires = now.toUTCString()
              document.cookie = key + '=' + value + '; expires=' + expires + '; path=/';
          }
        },
        onRevoke: function(category) {
          if (category == 'analytics') {
            //console.log('The analytics category was just revoked');
            const now = new Date();
            var numberOfDays = 365
            var key = '_hjOptOut'
            var value = 'true'
            // set the time to be now + numberOfDays
            now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
            var expires = now.toUTCString()
            document.cookie = key + '=' + value + '; expires=' + expires + '; path=/';
          }
        }
      };

      (function (h, u, b) {
        var d = h.getElementsByTagName("script")[0], e = h.createElement("script");
        e.async = true;
        e.src = '${cookieHubSrc}';
        e.onload = function () {
          u.cookiehub.load(b);
        }
        d.parentNode.insertBefore(e, d);
      })(document, window, cpm);`

      return <Helmet
        script={ [ {
          type: 'text/javascript',
          innerHTML: cookieHubScript
        }
        ] }
      />

    }())

  )
}
export default CookieHub
