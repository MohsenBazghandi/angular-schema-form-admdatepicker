angular.module('schemaForm').run(['$templateCache', function($templateCache) {$templateCache.put('directives/decorators/bootstrap/datepicker/datepicker.html','<div class="form-group {{form.htmlClass}}"\n     ng-class="{\'has-error\': form.disableErrorState !== true && hasError(),\'has-success\': form.disableSuccessState !== true && hasSuccess()}">\n    <label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label>\n    <div ng-class="{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}">\n\n        <span ng-if="form.fieldAddonLeft"\n              class="input-group-addon"\n              ng-bind-html="form.fieldAddonLeft">\n        </span>\n        <adm-dtp ng-show="form.key"\n                 sf-changed="form"\n                 ng-show="form.key"\n                 ng-model="$$value$$"\n                 class="form-control {{form.fieldHtmlClass}}"\n                 schema-validate="form"\n                 name="form.key.slice(-1)[0]"\n                 ng-disabled="form.readonly"\n                 mindate="{{form.minDate}}"\n                 maxdate="{{form.maxDate}}"\n                 options=\'{calType: "jalali", format: "YYYY/MM/DD",autoClose:true ,default:form.default}\'>\n        </adm-dtp>\n        <span ng-if="form.fieldAddonRight"\n              class="input-group-addon"\n              ng-bind-html="form.fieldAddonRight">\n        </span>\n    </div>\n    <span ng-if="form.feedback !== false" class="form-control-feedback"\n          ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }"\n          aria-hidden="true">\n    </span>\n    <!--<span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + \'Status\'}}\\" class="sr-only">\n        <svg class="icon" ng-show="hasError()">\n            <use xlink:href="public/admin/assets/icons/icons.svg#info_outline"></use>\n        </svg>\n    </span>-->\n    <div class="help-block" ng-show="hasError()" sf-message="form.description"></div>\n</div>');}]);
angular.module('schemaForm').config(
  ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

      var datepicker = function (name, schema, options) {
        if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
          var f = schemaFormProvider.stdFormObj(name, schema, options);
          f.key = options.path;
          f.type = 'datepicker';
          options.lookup[sfPathProvider.stringify(options.path)] = f;
          return f;
        }
      };

      schemaFormProvider.defaults.string.unshift(datepicker);

      //Add to the bootstrap directive
      schemaFormDecoratorsProvider.addMapping(
        'bootstrapDecorator',
        'datepicker',
        'directives/decorators/bootstrap/datepicker/datepicker.html'
      );
      schemaFormDecoratorsProvider.createDirective(
        'datepicker',
        'directives/decorators/bootstrap/datepicker/datepicker.html'
      );
    }
  ]);
