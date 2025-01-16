<?php

namespace App\Support;

use League\ISO3166\ISO3166;

/**
 * Class Countries
 */
class Countries
{
    /**
     * Custom countries to be added or override default ones.
     *
     * @var array
     */
    protected static $customCountries = [
        'zl' => 'Samland',
    ];

    /**
     * Get a select box list of all the countries
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getSelectList()
    {
        // Get the default ISO 3166 countries
        $defaultCountries = collect((new ISO3166())->all())
            ->mapWithKeys(static function ($item) {
                return [strtolower($item['alpha2']) => $item['name']];
            });

        // Convert custom countries array into a collection
        $customCountriesCollection = collect(static::$customCountries);

        // Merge the collections, with custom countries overriding default ones
        return $defaultCountries->merge($customCountriesCollection);
    }
}
