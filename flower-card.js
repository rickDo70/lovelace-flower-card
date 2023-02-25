import {unsafeHTML} from 'https://unpkg.com/lit-html@latest/directives/unsafe-html.js?module';

customElements.whenDefined("card-tools").then(() => {
  /*
  /
  / Possible options for bars:
  / - moisture
  / - illuminance
  / - conductivity
  / - temperature
  / - humidity
  / - dli
  /
  */
  var cardTools = customElements.get("card-tools");
  var missingImage =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiIHJvbGU9ImltZyIgYXJpYS1oaWRkZW49InRydWUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICAgIDxnPgogICAgICA8IS0tP2xpdCQ0MTM0MjMxNjkkLS0+PHBhdGggZD0iTTMsMTNBOSw5IDAgMCwwIDEyLDIyQzEyLDE3IDcuOTcsMTMgMywxM00xMiw1LjVBMi41LDIuNSAwIDAsMSAxNC41LDhBMi41LDIuNSAwIDAsMSAxMiwxMC41QTIuNSwyLjUgMCAwLDEgOS41LDhBMi41LDIuNSAwIDAsMSAxMiw1LjVNNS42LDEwLjI1QTIuNSwyLjUgMCAwLDAgOC4xLDEyLjc1QzguNjMsMTIuNzUgOS4xMiwxMi41OCA5LjUsMTIuMzFDOS41LDEyLjM3IDkuNSwxMi40MyA5LjUsMTIuNUEyLjUsMi41IDAgMCwwIDEyLDE1QTIuNSwyLjUgMCAwLDAgMTQuNSwxMi41QzE0LjUsMTIuNDMgMTQuNSwxMi4zNyAxNC41LDEyLjMxQzE0Ljg4LDEyLjU4IDE1LjM3LDEyLjc1IDE1LjksMTIuNzVDMTcuMjgsMTIuNzUgMTguNCwxMS42MyAxOC40LDEwLjI1QzE4LjQsOS4yNSAxNy44MSw4LjQgMTYuOTcsOEMxNy44MSw3LjYgMTguNCw2Ljc0IDE4LjQsNS43NUMxOC40LDQuMzcgMTcuMjgsMy4yNSAxNS45LDMuMjVDMTUuMzcsMy4yNSAxNC44OCwzLjQxIDE0LjUsMy42OUMxNC41LDMuNjMgMTQuNSwzLjU2IDE0LjUsMy41QTIuNSwyLjUgMCAwLDAgMTIsMUEyLjUsMi41IDAgMCwwIDkuNSwzLjVDOS41LDMuNTYgOS41LDMuNjMgOS41LDMuNjlDOS4xMiwzLjQxIDguNjMsMy4yNSA4LjEsMy4yNUEyLjUsMi41IDAgMCwwIDUuNiw1Ljc1QzUuNiw2Ljc0IDYuMTksNy42IDcuMDMsOEM2LjE5LDguNCA1LjYsOS4yNSA1LjYsMTAuMjVNMTIsMjJBOSw5IDAgMCwwIDIxLDEzQzE2LDEzIDEyLDE3IDEyLDIyWiI+PC9wYXRoPgogICAgICA8L2c+Cjwvc3ZnPgo=";

  class FlowerCard extends cardTools.LitElement {
    getCardSize() {
      return 5;
    }
    
    async setConfig(config) {
      this.config = config;
    }

    static get styles() {
      return cardTools.LitCSS`
      ha-card {
        margin-top: 5px;
      }
      .attributes {
        white-space: nowrap;
        padding: 8px;
      }
      .attribute ha-icon {
        vertical-align: middle;
        display: inline-grid;
      }
      .attribute {
        display: inline-block;
        width: 50%;
        vertical-align: middle;
        white-space: nowrap;
        
      }
      #battery {
        float: right;
        margin-right: 16px;
        margin-top: -15px;
      }
      .header {
        padding-top: 8px;
        height: 72px;
      }
      .attribute .header {
        height: auto;
      }
      .header > img {
        border-radius: 50%;
        width: 88px;
        height: 88px;
        object-fit: cover;
        margin-left: 16px;
        margin-right: 16px;
        float: left;
        box-shadow: var( --ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) );
      }
      .header > #name {
        font-weight: bold;
        width: 100%;
        margin-left: 16px;
        margin-top: 16px;
        display: block;
      }
      #name ha-icon {
          color: rgb(240, 163, 163);
      }
      .header > #species {
        margin-left: 16px;
        color: #8c96a5;
        display: block;
      }

      #iu_enabled_icon {
        float: right;
        margin-right: 16px;
        margin-top: -30px;
      }
      .iu_header {
        padding-top: 8px;
        height: 30px;
      }
      .iu_header > #iu_title {
        margin-left: 16px;
        color: #8c96a5;
        display: block;
      }

      .meter {
        height: 8px;
        background-color: #f1f1f1;
        border-radius: 2px;
        display: inline-grid;
        overflow: hidden;
      }
      .meter.red {
        width: 5%;
      }
      .meter.green {
        width: 40%;
      }
      .meter > span {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
      }
      .meter > .good {
        background-color: rgba(43,194,83,1);
      }
      .meter > .bad {
        background-color: rgba(240,163,163);
      }
      .meter > .unavailable {
        background-color: rgba(158,158,158,1);
      }
      .divider {
        height: 1px;
        background-color: #727272;
        opacity: 0.25;
        margin-left: 8px;
        margin-right: 8px;
      }
      .tooltip {
        position: relative;
      }
      .tooltip .tip {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        padding: 6px 10px;
        top: 3.3em;
        left: 50%;
        -webkit-transform: translateX(-50%) translateY(-180%);
                transform: translateX(-50%) translateY(-180%);
        background: grey;
        color: white;
        white-space: nowrap;
        z-index: 2;
        border-radius: 2px;
        transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), -webkit-transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
        transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
        transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), -webkit-transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
      }
      .battery.tooltip .tip {
        top: 2em;
      }
      .tooltip:hover .tip, .tooltip:active .tip {
        display: block;
        opacity: 1;
        visibility: visible;
        -webkit-transform: translateX(-50%) translateY(-200%);
                transform: translateX(-50%) translateY(-200%);
      }
      @media (max-width: 600px) {
        .header > .unit {
          display: none;
        }
      }
      `;
    }

    render() {
      if (!this.stateObj) {
        return cardTools.LitHtml`
            <hui-warning>
            Entity not available: ${this.config.entity}
            </hui-warning>
          `;
      }
      const species = this.stateObj.attributes.species;
      var icons = {};
      var uom = {};
      var uomt = {};
      var limits = {};
      var curr = {};
      var sensors = {};
      var displayed = [];
      var monitored = this.config.show_bars || [
        "moisture",
        "conductivity",
        "temperature",
        "illuminance",
        "humidity",
        "dli",
      ];
      const battery_sensor = this.config.battery_sensor || null;
      const iu_zone = this.config.iu_zone || null;

      if (this.plantinfo && this.plantinfo["result"]) {
        const result = this.plantinfo["result"];
        for (var i = 0; i < monitored.length; i++) {
          let elem = monitored[i];
          if (result[elem]) {
            limits["max_" + elem] = result[elem].max;
            limits["min_" + elem] = result[elem].min;
            curr[elem] = result[elem].current;
            icons[elem] = result[elem].icon;
            sensors[elem] = result[elem].sensor;
            uomt[elem] = result[elem].unit_of_measurement;
            uom[elem] = result[elem].unit_of_measurement;
            if (elem == "dli") {
              uomt["dli"] = "mol/d⋅m²";
              uom["dli"] = '<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>';
            }
            displayed.push(elem);
          }
        }
      }
      const attribute = (attr) => {
        const min = parseFloat(limits["min_" + attr]);
        const max = parseFloat(limits["max_" + attr]);
        const unit = uom[attr];
        const unitTooltip = uomt[attr];
        const icon = icons[attr] || "mdi:help-circle-outline";
        var val = parseFloat(curr[attr]);
        if (isNaN(val)) {
          var aval = false;
          var pct = 0;
          val = "";
        } else {
          var aval = true;
          var pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)));
        }

        var toolTipText = aval ? attr + ": " + val + " " + unitTooltip + '<br>(' + min + " ~ " + max +" " + unitTooltip + ")"
                               : this._hass.localize('state.default.unavailable');

        return cardTools.LitHtml`
        <div class="attribute tooltip" @click="${() => cardTools.moreInfo(sensors[attr])}">
          <div class="tip" style="text-align:center;">${unsafeHTML(toolTipText)}</div>
          <ha-icon .icon="${icon}"></ha-icon>
          <div class="meter red">
            <span class="${
              aval ? (val < min || val > max ? "bad" : "good") : "unavailable"
            }" style="width: 100%;"></span>
          </div>
          <div class="meter green">
            <span class="${
              aval ? (val > max ? "bad" : "good") : "unavailable"
            }" style="width:${aval ? pct : "0"}%;"></span>
          </div>
          <div class="meter red">
            <span class="bad" style="width:${
              aval ? (val > max ? 100 : 0) : "0"
            }%;"></span>
          </div>
          <span class="header"><span class="value">${val}</span>&nbsp;<span class="unit">${unsafeHTML(unit)}</span></span>
        </div>
        `;
      };

      const iu_zone_info = () => {
        if (iu_zone) {
            /*
            const iu_zoneDisable = cardTools.createElement({
                type: "state-icon",
                tap_action: {
                  action: "call-service",
                  service: "irrigation_unlimited.toggle",
                  data: {entity_id: iu_zone},
                  target: {}
                },
                entity: iu_zone,
                icon: "mdi:toggle-switch-off-outline",
                
              });
            */
            //console.log(myElement.innerHtml);
            const iu_zone_attributes = this._hass.states[iu_zone].attributes;
            //const iu_enabled = iu_zone_attributes.enabled; // stateAttr...
            const iu_enabled_icon = (iu_zone_attributes.enabled) ? "mdi:toggle-switch-outline" : "mdi:toggle-switch-off-outline";
            const iu_enabled_icon_color = (iu_zone_attributes.enabled) ? "green" : "red";
            const ha_root = document.querySelector("hc-main") || document.querySelector("home-assistant");
            //console.log(iu_enabled);
            /*
                status, next_start, enabled, duration, done, iu_icon
                
            mdi:toggle-switch-off-outline   red
            mdi:toggle-switch-on-outline    green

    "zone_id": "1",
    "index": 0,
    "enabled": true,
    "status": "off",
    "schedule_count": 0,
    "schedules": "",
    "adjustment": "",
    "current_schedule": null,
    "percent_complete": 0,
    "next_adjustment": ",%47.0",
    "next_schedule": 1,
    "next_name": "normal",
    "next_start": "2023-02-26T06:22:35+01:00",
    "next_duration": "0:04:42",
    "today_total": 4,
    "icon": "mdi:valve-closed",
    "friendly_name": "Gemüse"
}
            */
           let iu_zone_info_text;
            if (!iu_zone_attributes.enabled) {
                iu_zone_info_text = cardTools.LitHtml`
                <span>Die Zone ist deaktiviert</span>
                `;
            } else if (iu_zone_attributes.status == 'off') {
                iu_zone_info_text = cardTools.LitHtml`
                <span>Aktuell keine Bewässerung</span>
                `;
            } else if (iu_zone_attributes.status == 'on') {
                iu_zone_info_text = cardTools.LitHtml`
                <span>Aktuell wird bewässert</span>
                `;
            } else {
                iu_zone_info_text = cardTools.LitHtml`
                <span>Kein Status? ${iu_zone_attributes.status}</span>
                `;
            }
            return cardTools.LitHtml`
            <div class="iu_header">
                <span id="iu_title">Bewässerungsautomatik</span>
                <div id="iu_enabled_icon" @click='${() => cardTools.fireEvent("iu_zone_toggle_enabled")}'><ha-icon .icon="${iu_enabled_icon}" style="color: ${iu_enabled_icon_color}"></ha-icon></div>
            </div>
            <div class="divider"></div>
            <div class="attributes" style="height: 100px">
                ${iu_zone_info_text}
            </div>
            `;
        } else {
            return cardTools.LitHtml``;
        }
      }
      const battery = () => {
        if (battery_sensor) {
          if (this._hass.states[battery_sensor]) {
            var value = this._hass.states[battery_sensor].state + '%';
            switch (true) {
              case this._hass.states[battery_sensor].state > 90:
                var icon = "mdi:battery";
                var battery_color = "green";
                break;
              case this._hass.states[battery_sensor].state > 80:
                var icon = "mdi:battery-90";
                var battery_color = "green";
                break;
              case this._hass.states[battery_sensor].state > 70:
                var icon = "mdi:battery-80";
                var battery_color = "green";
                break;
              case this._hass.states[battery_sensor].state > 60:
                var icon = "mdi:battery-70";
                var battery_color = "green";
                break;
              case this._hass.states[battery_sensor].state > 50:
                var icon = "mdi:battery-60";
                var battery_color = "green";
                break;
              case this._hass.states[battery_sensor].state > 40:
                var icon = "mdi:battery-50";
                var battery_color = "green";
                break;
              case this._hass.states[battery_sensor].state > 30:
                var icon = "mdi:battery-40";
                var battery_color = "orange";
                break;
              case this._hass.states[battery_sensor].state > 20:
                var icon = "mdi:battery-30";
                var battery_color = "orange";
                break;
              case this._hass.states[battery_sensor].state > 10:
                var icon = "mdi:battery-20";
                var battery_color = "red";
                break;
              case this._hass.states[battery_sensor].state == 0:
                var icon = "mdi:battery-alert-variant-outline";
                var battery_color = "red";
                break;
              case this._hass.states[battery_sensor].state == 'unavailable':
                var icon = "mdi:battery-off-outline";
                var battery_color = "rgba(158,158,158,1)";
                var value =  this._hass.localize('state.default.unavailable');
                break;
              default:
                var icon = "mdi:battery-10";
                var battery_color = "red";
            }
          } else {
            var icon = "mdi:battery-off-outline";
            var battery_color = "rgba(158,158,158,1)";
            var value =  this._hass.localize('state.default.unavailable');
          }
          return cardTools.LitHtml`
          <div class="battery tooltip">
          <div class="tip" style="text-align:center;">${value}</div>
          <ha-icon .icon="${icon}" style="color: ${battery_color}"></ha-icon>
          </div>
          `;
        } else {
          return cardTools.LitHtml``;
        }
      };
      return cardTools.LitHtml`
        <ha-card>
        <div class="header" @click="${() =>
          cardTools.moreInfo(this.stateObj.entity_id)}">
          <span id="name"> ${
            this.stateObj.attributes.friendly_name
          } <ha-icon .icon="mdi:${
        this.stateObj.state.toLowerCase() == "problem"
          ? "alert-circle-outline"
          : ""
      }"></ha-icon>
          </span>
          <span id="battery">${battery()}</span>
          <span id="species">${species} </span>
        </div>
        <div class="divider"></div>
        <div class="attributes">
          ${displayed[0] == undefined ? void 0 : attribute(displayed[0])}
          ${displayed[1] == undefined ? void 0 : attribute(displayed[1])}
        </div>
        <div class="attributes">
          ${displayed[2] == undefined ? void 0 : attribute(displayed[2])}
          ${displayed[3] == undefined ? void 0 : attribute(displayed[3])}
        </div>
        <div class="attributes">
          ${displayed[4] == undefined ? void 0 : attribute(displayed[4])}
          ${displayed[5] == undefined ? void 0 : attribute(displayed[5])}
        </div>
        ${iu_zone_info()}
        </ha-card>
        `;
    }

    async get_data(hass) {
      try {
        this.plantinfo = await hass.callWS({
          type: "plant/get_info",
          entity_id: this.config.entity,
        });
      } catch (err) {}
    }

    set hass(hass) {
      this._hass = hass;
      this.stateObj = hass.states[this.config.entity];
      if (!this.prev_fetch) {
        this.prev_fetch = 0;
      }
      // Only fetch once every second at max.  HA is flooeded with websocket requests
      if (Date.now() > this.prev_fetch + 1000) {
        this.prev_fetch = Date.now();
        this.get_data(hass).then(() => {
          this.requestUpdate();
        });
      }
    }
  }

  customElements.define("flower-card", FlowerCard);
});

window.setTimeout(() => {
  if (customElements.get("card-tools")) return;
  customElements.define(
    "flower-card",
    class extends HTMLElement {
      setConfig() {
        throw new Error(
          "Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools"
        );
      }
    }
  );
}, 2000);
