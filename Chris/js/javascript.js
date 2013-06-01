//define selectors:

var ADVANCED_OPTIONS_ID = '#advanced-options';
var SUBMIT_SEARCH_ID = '#submit-search';
var SEARCH_TERMS_BAR_ID = '#search-terms-bar';
var ADVANCED_OPTIONS_BUTTON_ID = '#advanced-options-button';
var CLEAR_ALL_BUTTON_ID = '#clear-all-button';
var EXACT_PHRASE_BAR_ID = '#exact-phrase-bar';
var FROM_DATE_ID = '#from-date';
var TO_DATE_ID = '#to-date';
var TITLE_ONLY_CHECKBOX_ID = '#title-only-checkbox';
var RESULTS_ACCORDION_ID = '#results-accordion';
var RESULTS_HEADER_CLASS = '.results-header';
var DEFAULT_TEXT_CLASS = '.default-text';
var DEFAULT_TEXT_ACTIVE = 'default-text-active';
var BACK_TO_TOP_ID = '#back-to-top';

$(document).ready(function(){
	initialize();
});

/* Set up jquery events on initial page load */
function initialize() {

	$('label').disableSelection();
	
	//configureAutocomplete();
	
	configureDefaultText();
		
	configureAdvancedOptionsSlide();
	
	configureAccordian();
	
	disableTextSelection();

	$(SUBMIT_SEARCH_ID).click(configureSubmitButton);
	configureClearAllButton();
	configureBackToTopButton();
}

function configureAutocomplete() {
	var availableTags = [
		"Doobs",
		"Amir",
		"Jake",
		"Scripts",
		"Chill dudes",
		"Milkman (with Ben Schwartz)",
	];
	$( SEARCH_TERMS_BAR_ID ).autocomplete({
		source: availableTags
	});
}

function configureAdvancedOptionsSlide() {
	$(ADVANCED_OPTIONS_ID).hide();

	$(ADVANCED_OPTIONS_BUTTON_ID).click(function() {
		$(ADVANCED_OPTIONS_ID).slideToggle(200, function() {
			if($(ADVANCED_OPTIONS_ID).is(':visible')) {
				$(ADVANCED_OPTIONS_BUTTON_ID).html("Advanced Options &#9650;");
			} else {
				$(ADVANCED_OPTIONS_BUTTON_ID).html("Advanced Options &#9660;");
				
			}
		});
	});
}

function configureSubmitButton() {
		
	if($(ADVANCED_OPTIONS_ID).is(':hidden')) {
		clearAdvancedFields();
	}
}

function configureClearAllButton() {
	$(CLEAR_ALL_BUTTON_ID).click(clearAllFields);
}

/* Advanced views should not take effect if dropdown is hidden */
function clearAdvancedFields() {
		$(EXACT_PHRASE_BAR_ID).val("");
		$(FROM_DATE_ID).val("");
		$(TO_DATE_ID).val("");
		$(TITLE_ONLY_CHECKBOX_ID).attr('checked', false);
}

function clearAllFields() {
	$(SEARCH_TERMS_BAR_ID).val("");
	clearAdvancedFields();
}


function configureAccordian() {
	$( RESULTS_ACCORDION_ID ).accordion({
		active: false,
		collapsible: true,
		animate: 200,
		heightStyle: 'content',
    });
}

function disableTextSelection() {
	$(RESULTS_HEADER_CLASS).disableSelection();
}

function configureDefaultText() {
	$(DEFAULT_TEXT_CLASS).focus(function(srcc) {
        if ($(this).val() == $(this)[0].title) {
            $(this).removeClass(DEFAULT_TEXT_ACTIVE);
            $(this).val("");
        }
    });
    
    $(DEFAULT_TEXT_CLASS).blur(function() {
        if ($(this).val() == "") {
            $(this).addClass(DEFAULT_TEXT_ACTIVE);
            $(this).val($(this)[0].title);
        }
    });
    
    $(DEFAULT_TEXT_CLASS).blur(); 
}


function configureBackToTopButton() {
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$(BACK_TO_TOP_ID).fadeIn();	
		} else {
			$(BACK_TO_TOP_ID).fadeOut();
		}
	});
 
	$(BACK_TO_TOP_ID).click(function() {
		$('body,html').animate({scrollTop:0},800);
	});

}
