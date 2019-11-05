/*! RESOURCE: /scripts/classes/doctype/CurrencyElement.js */
var CurrencyElement = Class.create(GlideFilterCurrency, {
    initialize: function(name, type) {
        this.name = name;
        this.currencyType = type;
        this.fieldName = $(this.name);
        this.initCurrency();
        this.setCurrency();
    },
    initCurrency: function() {
        var c = gel(this.name).value;
        /.
        var amount, currency;
        if (!c) {
            if (typeof multi !== "undefined" && multi) {
                amount = '';
                currency = code;
            }
        } else {
            c = c.split(';');
            currency = c[0];
            amount = c[1];
        }
        var originalValue = this.getValue(this.name) || "";
        var originalValueNumber = originalValue ? originalValue.split(";") : "";
        if (originalValueNumber[1] == "")
            originalValue += "0.00";
        if (originalValue.indexOf(".") == -1)
            originalValue += ".00";
        gel("sys_original." + this.name).value = originalValue;
        var dw = gel(this.name + ".display");
        if (dw) {
            var displayAmount = dw.value;
            dw.value = formatNumber(displayAmount);
        }
        var sel = gel(this.name + '.currency');
        if (!sel)
            return;
        if (!sel.options)
            return;
        var found = false;
        for (var i = 0; i != sel.options.length; i++) {
            if (sel.options[i].value != currency)
                continue;
            sel.options[i].selected = true;
            found = true;
            break;
        }
        if (!found)
            addOption(sel, currency, currency).selected = true;
    },
    setCurrency: function() {
        var currencyElem = gel(this.name + '.currency');
        var displayElem = gel(this.name + '.display');
        var value = "";
        if (currencyElem)
            value += currencyElem.value;
        value += ";";
        if (displayElem) {
            var num = displayElem.value;
            if (num == '')
                value = '';
            else
                value += num;
        }
        this._setElementValue(value);
    },
    setPolicyValue: function() {
        var field = this.name.split('.')[1];
        if (!this.hasPolicy(field)) {
            onChange(this.name);
            return;
        }
        var currency = this.value.split(';')[0];
        var value = this.value.split(';')[1];
        var ajax = new GlideAjax('CurrencyConverter');
        ajax.addParam('sysparm_name', 'convertStorageValue');
        ajax.addParam('sysparm_type', currency);
        ajax.addParam('sysparm_value', value);
        ajax.getXMLAnswer(this.setPolicyValueResponse.bind(this), [], this.name);
    },
    setPolicyValueResponse: function(answer) {
        var eStorage = gel(this.name + ".storage");
        var eDisplay = gel(this.name + ".display");
        eStorage.value = answer;
        eDisplay.title = answer;
        onChange(this.name);
    },
    setSessionCurrencyCode: function() {},
    hasPolicy: function() {
        var field = this.name.split('.')[1];
        for (var i = 0; i < uiPolicies.length; i++)
            if (uiPolicies[i].hasPolicy(field))
                return true;
        return false;
    },
    getValue: function() {
        return gel(this.name).getAttribute("value");
    },
    _extractCurrency: function(currency) {
        var currencyParts = currency.split(';');
        var localeCode = window.NOW.locale.code.replace(/_/g, '-');
        var value = currencyParts[1].replace(/[^\d-^.]/g, '');
        var negPrefix = value.startsWith('-') ? '-' : '';
        value = negPrefix + value.replace(/[^\d\.]/g, '');
        var amount = Number(value)
            .toLocaleString(localeCode, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4
            });
        return {
            amount: amount,
            type: currencyParts[0]
        }
    },
    setValue: function(value, displayValue) {
        if (displayValue && displayValue.indexOf(";") > -1) {
            value = displayValue;
        } else if (!value) {
            return;
        } else if (value.indexOf(";") === -1) {
            value = window.NOW.currency.code + ';' + value;
        }
        var currency = this._extractCurrency(value);
        if (currency.amount === "NaN") {
            console.log('%c WARNING: setValue called with an invalid currency NaN', 'background: darkred; color: white;');
            return;
        }
        this.fieldName.setValue(value);
        var dw = gel(this.name + ".display");
        if (dw) {
            dw.value = currency.amount;
            this._getCurrencySelect().value = currency.type;
        }
        var currencyValue = currency.type + ';' + currency.amount;
        this._setElementValue(currencyValue);
        onChange(this.name);
    },
    _setElementValue: function(value) {
        this.value = value;
        gel(this.name).value = value;
    },
    setReadOnly: function(disabled) {
        var pd = gel(this.name + '.display');
        if (!pd)
            return;
        var ps = gel(this.name + '.currency');
        var pe = gel(this.name + '.editLink');
        g_form.setDisabledControl(pd, disabled);
        if (ps)
            g_form.setDisabledControl(ps, disabled);
        if (pe) {
            if (disabled)
                pe.style.display = 'none';
            else
                pe.style.display = 'inline-block';
        }
    },
    isDisabled: function() {
        var pd = gel(this.name + '.display');
        if (!pd)
            return;
        var ps = this._getCurrencySelect();
        var pe = gel(this.name + '.editLink');
        if (ps && !hasClassName(ps, 'disabled'))
            return false;
        if (pe && pe.style.display != 'none')
            return false;
        return true;
    },
    currencyURL: function(table, fieldName) {
        return 'sysparm_query=table=' + table + '^field=' + fieldName + '^id=$sys_id';
    },
    editValue: function(table, fieldName) {
        this.url_fragment = (this.currencyType === "price") ? 'fx_price.do?' : 'fx_currency_instance.do?';
        this.url_suffix = (this.currencyType === "price") ? '^parent=NULL' : '';
        var url = this.url_fragment + this.currencyURL(table, fieldName) + this.url_suffix;
        checkSaveURL(table, url);
    },
    _getCurrencySelect: function() {
        return gel(this.name + '.currency');
    },
    type: "CurrencyElement",
    z: null
});
(function() {
    CachedEvent.after('glideform.initialized', function() {
        var elems = $$('input[data-type="glide_element_currency"]');
        elems.each(function(elem) {
            var ref = elem.getAttribute('data-ref');
            var internalType = elem.getAttribute('data-internal-type');
            if (ref && (typeof g_form != 'undefined')) {
                var cHandler = new CurrencyElement(ref, internalType);
                g_form.registerHandler(ref, cHandler);
                elem.observe('change', function(evt) {
                    elem.value = formatNumber(elem.value);
                    cHandler.setCurrency();
                    cHandler.setPolicyValue();
                });
            }
            var currencyInputs = $$('input[data-type="glide_element_currency_' + ref + '_input"]');
            currencyInputs.each(function(currencyInput) {
                currencyInput.observe('change', function() {
                    currencyInput.value = formatNumber(currencyInput.value);
                    cHandler.setCurrency();
                    cHandler.setPolicyValue();
                });
            });
            var currencyLinks = $$('a[data-type="' + ref + '_glide_element_currency"]');
            currencyLinks.each(function(currencyElem) {
                var table = currencyElem.getAttribute('data-class_name');
                var fieldName = currencyElem.getAttribute('data-name')
                currencyElem.observe('click', function(evt) {
                    cHandler.editValue(table, fieldName);
                });
            });
            var currencySelects = $$('select[data-type="glide_element_currency_' + ref + '_select"]');
            currencySelects.each(function(currencySelect) {
                currencySelect.observe('change', function(evt) {
                    cHandler.setCurrency();
                    cHandler.setPolicyValue();
                });
            });
        });
    });
})();;