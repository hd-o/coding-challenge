import { MuiAutocompleteCtx } from '/src/pkg/mui/Autocomplete'
import { MuiTextFieldCtx } from '/src/pkg/mui/TextField'
import { ReactIntlUseIntlCtx } from '/src/pkg/react-intl/useIntl'
import { FetchJSONCtx } from '/src/util/fetchJSON'
import { WeatherLocation } from '/src/weather/api/location/model'
import { WeatherApiLocationSearchCtx } from '/src/weather/api/location/search'
import { createContext, useContext, useRef, useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
  location?: WeatherLocation
  setLocation: (location: WeatherLocation|undefined) => void
}

function LocationSearch (props: Props): JSX.Element {
  const Autocomplete = useContext(MuiAutocompleteCtx)
  const TextField = useContext(MuiTextFieldCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const locationSearch = useContext(WeatherApiLocationSearchCtx)()
  const fetchJson = useContext(FetchJSONCtx)()

  const [location, setLocation] = useState(props.location ?? null)
  const [locationQuery, setLocationQuery] = useState(props.location?.title ?? '')
  const { current: searchResults } = useRef(new Map<string, WeatherLocation[]>())
  const options = searchResults.get(locationQuery)

  const { isLoading, error } = useQuery(
    ['reminder-location-search', locationQuery],
    async (): Promise<WeatherLocation[]> => await fetchJson(locationSearch(locationQuery)),
    {
      enabled: (
        options === undefined &&
        locationQuery.length > 2
      ),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      onSuccess (data: WeatherLocation[] = []) {
        searchResults.set(locationQuery, data)
      }
    })

  return <Autocomplete
    blurOnSelect
    clearOnBlur={
      false
    }
    inputValue={
      locationQuery
    }
    isOptionEqualToValue={(option, value) =>
      option.woeid === value.woeid
    }
    getOptionLabel={
      ({ title }) => title
    }
    loading={
      isLoading
    }
    noOptionsText={
      intl.formatMessage({
        id: error !== null ? 'error-loading' : 'no-results'
      })
    }
    open={
      options !== undefined &&
      locationQuery !== location?.title
    }
    onChange={(_, location) => {
      setLocation(location)
      setLocationQuery(location?.title ?? '')
      props.setLocation(location ?? undefined)
    }}
    onInputChange={(_, locationText) => {
      setLocationQuery(locationText)
    }}
    options={
      options ?? []
    }
    renderInput={(params) =>
      <TextField {...params}
        fullWidth
        inputProps={{
          ...params.inputProps,
          'data-testid': 'reminder-editor-location'
        }}
        label={intl.formatMessage({ id: 'location-city' })}
        variant="standard"
      />
    }
    value={
      location?.title === locationQuery
        ? location
        : null
    }
  />
}

export const LocationSearchCtx = createContext(LocationSearch)
