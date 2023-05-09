@php 
			$entry_token = $entry_data["entry_token"];
			$confirmation_key = $entry_data["entry_confirmation"];
			$state = $entry_data["state"];
			$title = $entry_data["title"];
			$queue_check = $entry_data["queue_check"];
			$queue_check_options = $entry_data["queue_check_options"];
			$init_interval = $queue_check_options["rate_limiter"]["init_interval"];
			$slowdown_interval = $queue_check_options["rate_limiter"]["slowdown_interval"];
			$fail_tries = $queue_check_options["rate_limiter"]["fail_tries"];
			$slowdown_tries = $queue_check_options["rate_limiter"]["slowdown_tries"];
			
			if($entry_data['customizations']['preloader_theme'] === 'darkblue') {
				$theme_bg = '#03060f';
				$theme_textcolor = 'white';
			} else {
				$theme_bg = 'black';
				$theme_textcolor = '#FFF';
			}
@endphp
<!DOCTYPE html>

<head>
		<title>{{ $title ?? "undefined"}}</title>
		<meta charset="UTF-8"/>
		<meta lang="en"/>
		<style>
			html {
				overflow: hidden;
				transition: all 3s ease;
			}

			.check-circle {
					width:50px;
					height:50px;
					visibility: hidden;
				
			}
			
			/* loading dots */

			.loading:after {
				content: '.';
				font-size: 18px;
				letter-spacing: 1px;
				transition: all ease-in-out;
				animation: dots 1s steps(5, end) infinite;}

			@keyframes dots {
				0%, 20% {
					color: rgba(0,0,0,0);
					text-shadow:
						.25em 0 0 rgba(0,0,0,0),
						.5em 0 0 rgba(0,0,0,0);}
				40% {
					color: white;
					text-shadow:
						.25em 0 0 rgba(0,0,0,0),
						.5em 0 0 rgba(0,0,0,0);}
				60% {
					text-shadow:
						.25em 0 0 white,
						.5em 0 0 rgba(0,0,0,0);}
				80%, 100% {
					text-shadow:
						.25em 0 0 white,
						.5em 0 0 white;}}


				.check-circle.check-circle--loading {
					
					animation:         loading 5s infinite linear; /* IE 10+, Fx 29+ */
				}
				.check-circle g {
					stroke-width:0.5
				}

				.check-circle.check-circle--none .check-circle__circle{
						stroke:grey;
				}

				.preloader{
					position:absolute;
					top:0;
					left:0;
					right:0;
					bottom:0;
					margin:auto;
					width:100vw;
					height:100vh;
					visibility:visible !important;
					opacity:1 !important;
					transition:all 0.3s ease-in-out;
					z-index:99999999999999;
				}
				.preloader_inner {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					width: auto;
					height: 6em;
					text-align: center;
					font-size: 2em;
					font-weight: 300;
				}
				.preloader_inner_refresh {
					margin: auto;
					text-align: center;
					font-size: 15px;
					letter-spacing: 1.1px;
					font-weight: 200 !important;
					opacity: 0.85;
				}
				.page{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					width: 100%;
					height: 4em;
					line-height: 1em;
					text-align: center;
					font-size: 1em;
					font-weight: 300;
					visibility:visible !important;
					opacity:1 !important;
					transition:all 0.3s ease;
				}
				.show{
					visibility:visible !important;
					opacity:1 !important;
					transition:all 0.3s ease;
				}

				body {
    margin: 0 auto;
    text-align: center;
	font-family: 'Inter', 'Roboto', sans-serif,  system-ui, -apple-system, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue' !important;
    font-weight: 600;
    overflow: hidden;
    background: {{ ($theme_bg) }};
	color: {{ ($theme_textcolor) }} !important;
  }
  
  header {
    margin: 6.25em auto;
    height: 2.6em;
    overflow: hidden;
    width: 100%;
  }
  
  ul,
  li {
    height: 13.5em;
    margin: 0px;
    padding: 0px;
    width: 100%;
  }
  
  li {
    list-style-type: none;
    margin: 0px 0 1px 0;
    height: 1em !important;
    padding: 0px 0 0px 0;
    font-size: 3em;
    text-transform: uppercase;
    width: 100%;
  }
  
  .t {
    animation-name: titleflip;
    animation: titleflip 5s ease-in-out infinite;
    }
  
  @-webkit-keyframes titleflip {
    0%, 20% {
    transform: translate(0px, -12.50em);
    }
    20%,
    40% {
   transform: translate(0px, -9.375em);
    }
    40%,
    60% {
      -webkit-transform: translate(0px, -6.44em);
    }
    60%,
    80% {
    transform: translate(0px, -3.44em);
    }
    80%,
    100% {
    transform: translate(0px, -0.315em);
    }
    100%,
    0% {
      transform: translate(0px, -12.50em);
    }
  }
		</style>

</head>
<body>

<div class="preloader">
  <div id="preload_status_text" class="preloader_inner">
	<div id="failed-icon" class="check-circle">
		<svg  style="display: hidden;" xmlns="http://www.w3.org/2000/svg" width="60" viewBox="0 0 20 20" class="check-circle__svg">
    <g    fill="#1d1d1d2e">
    <circle class="check-circle__circle" cx="10" cy="10" r="8.5"/>
    <path  class="check-circle__mark"  d="M5.2,10 8.5,13.4 14.8,7.2"/>
       <line class="check-circle__cross path line" fill="none" stroke="#D06079" stroke-width="0.5" stroke-linecap="round"   x1="7" y1="7" x2="13" y2="13"/>
  <line class="check-circle__cross path line" fill="none" stroke="#D06079" stroke-width="0.5" stroke-linecap="round"  x1="13" y1="7" x2="7" y2="13"/>
    </g>
  </svg>
			</div>
	<p id="main_status"> 
</p> 
				<p>
					<small class="preloader_inner_refresh" id="state">Entering the game queue <span class='loading'></span></small><small class="preloader_inner_refresh" id="tries_counter"></small>
				</p>

	</div>

	<p>
					<small class="preloader_inner_refresh" id="queue_status"></small>
				</p>

	@if(env('APP_ENV') === "development")
	<a href="/northplay/test/entry_token"><div class="preloader_inner_refresh">Refresh</div></a>
	@endif
</div>
<script>
var tries = 0;
var intervalMS = 1000;
var main_status = document.getElementById("main_status");
var status_text = document.getElementById("state");
var tries_counter = document.getElementById("tries_counter");
var failed_icon = document.getElementById("failed-icon");

var set_state = "";
var failed = 0;
var loaddots_status = '<span id="status_loading_dots" class="e loading"></span>';
var max_fail_tries = {{ $fail_tries }};
function increase_tries_counter() {
	tries = tries + 1;
	if(tries > 5) {
		tries_counter.innerHTML = ' [' + tries + ']';
	}
	if(tries > 11) {
		queue_status.innerHTML = 'Status: ['+set_state+'] - queue checks [' + tries + ' times], max. checks before failing: [' + max_fail_tries + '] - queue check interval: [' + intervalMS + ' ms].';
	}
}

function set_status_message() {
	status_text.innerHTML = set_state;

	if(set_state === "FAILED_TIMEOUT") {
		increase_tries_counter();
		main_status.innerHTML = "Queue Timeout..";
		status_text.innerHTML = 'Refresh page to retry game entry.';
		document.getElementById('failed-icon').classList.remove('check-circle');

	}
	if(set_state === "CREATE_GAME_SESSION_JOB_DISPATCHED"){
		status_text.innerHTML = 'Requesting game session at game provider <span class="loading"></span>';
	} 
	if(set_state === "QUEUED") {
		if(tries > 5) {
			status_text.innerHTML = loaddots_status + " &nbsp; &nbsp; Almost there! ";
		}
		if(tries > 11) {
			status_text.innerHTML = "Queue is taking a bit longer because of high traffic..";
		}
		if(tries < 6) {
		status_text.innerHTML = "Preparing your game " + loaddots_status;
		}
	} 
}

console.log(Object.values(@json($queue_check_options))[0]);

function start() {
var initInterval = setInterval(() => {
			increase_tries_counter();
			console.log('Queue[' + tries + '] - Interval[' + intervalMS + '] ms');
			if(tries > {{ $slowdown_tries }}) {
				if(intervalMS !== {{ $slowdown_interval }}) {
				clearInterval(initInterval);
				intervalMS = {{ $slowdown_interval }};
				console.info("Setting interval to " + intervalMS);
				start();
				}

				if(tries > max_fail_tries) {
					failed = 1;
				}
			}
			xhr = new XMLHttpRequest();
			url = "{{ $queue_check }}?entry_token={{ $entry_token }}&confirmation={{ $confirmation_key }}";
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function(){
					if (xhr.readyState === 4 && xhr.status === 200){
							console.log('Response from request [ ' + xhr.responseText + ']'); 
							if(JSON.parse(xhr.responseText)['state'] === "ACTIVE") {
								var sessionUrl = JSON.parse(xhr.responseText)['session_url'];
								window.location.replace(sessionUrl);
							}

							if(tries > 1) {
									set_state = JSON.parse(xhr.responseText)['state'];
									set_status_message();
							}
							if(failed) {
									set_state = "FAILED_TIMEOUT";
									set_status_message();
									clearInterval(initInterval);
							}
							if(intervalMS === 1000) { // first load
								clearInterval(initInterval);
								intervalMS = {{ $init_interval }};
								console.info("Setting interval to " + intervalMS);
								start();
							}
					}
			};
			xhr.send();
	}, intervalMS);

};
intervalMS = 1000;

start();
</script>


</body>
</html>