# Mindshare API Client

## Endpoint for getting the mindshare leaderboard
- Base url `https://uat-mindshare.nucleus.codes`
- Request mindshare leaderboard `GET /v1/metrics/external/mindshare-leaderboard-snapshots/{keyword}/{until_n_days}`

- `keyword` is project's exact user handle in x (twitter)
- `until_n_days` is the number of days from today, to `n` days back until the day you want to request the mindshare leaderboard. The project's campaign's start day is cutoff even if the `until_n_days` exceeds the campaign's start day. For example, if the campaign started 6 days ago, and you request mindshare leaderboard from today to 7 days ago, then the mindshare leaderboard will be calculated only up until 6 days ago (because that is when your campaign started).

P.S. Only limited sets of values are allowed for `until_n_days`. `until_n_days` is an enum with ONLY accepted values as 1, 7, 30, 90, 180 or 365.


Swagger API-doc here:
https://uat-mindshare.nucleus.codes/docs#/metrics/get_mindshare_leaderboard_snapshots_ext_v1_metrics_external_mindshare_leaderboard_snapshots__keyword___until_n_days__get


## Quick Start

```bash
pip install requests
```

```python

# Request the API-key token from the mindshare-leaderboard provider
# Add the API-key token provided to you in the the token section as follows
headers = {"Authorization": f"Bearer {token}"}

# No need to assign params if you want all of the engaging users in the mindshare leaderboard
# But if you want to create a private leaderboard or blacklist specific users, you will need to add their x_ids with a specific property_key in the params as below
params = {
    "private_x_user_ids": "1727289, 8129001,129201222,   18829001, 1221111 ... <other x user ids separated by comma> ",
    "excluded_user_ids": "12211,212112,33190122, 1026278282 .... <other x user ids you want to exclude>"
}

# The x user ids should be comma separated strings
# Excluded user ids take priority if the user ids are included in both private_x_user_ids and  excluded_user_ids field

# Make requests
import requests
try:

    # Get mindshare metrics
    response = requests.put(
        "https://uat-mindshare.nucleus.codes/v1/metrics/external/mindshare-leaderboard-snapshots/{keyword}/{until_n_days}",
        headers=headers,
        params=params
    )
    response.raise_for_status()
    print(response.json())

except requests.exceptions.HTTPError as e:
    print(f"HTTP {e.response.status_code}: {e.response.text}")
except Exception as e:
    print(f"Error: {e}")

```
