$(document).ready(function() {
	
	/** jQuery Templating **/
	
	var characters = [
		{ name: "Yoda", awesomeness: 1 },
		{ name: "LukeSkywalker", awesomeness: 2 },
		{ name: "KoalaBears", awesomeness: 3 }
  ];
	
	// Render the template with the characters data and insert
	// the rendered HTML under the "characters" form
	$( "#characterTemplate" ).tmpl( characters ).appendTo( "#characters" );

	/** jQuery Data Linking **/

	function getCharacterByName(name){
		var character;
		$.each( characters, function( index, value ){
			if( value.name == name ){
 				character = value;
			}
		});
		return character;
	}
	
	function fromFormToCollection( value, source, target ){
		var character = getCharacterByName( $(source).attr('id') );
		if( character != null ){
			character.awesomeness = value;
		}
	}

	function fromCollectionToForm( value, source, target ){
		$(target).val(value);
		var character = getCharacterByName( $(target).attr('id') );
		character.awesomeness = value;
	}
	
	var datalinkConfig = {};
	$.each( characters, function( index, value ){
		datalinkConfig[ value.name ] = {
			convert: fromFormToCollection,
			convertBack: fromCollectionToForm
		};
	} );

	$("#characters").link( characters, datalinkConfig );
	
	/** Other Setup Code **/
	
	$("#logButton").click( function(){ 
		$.each( characters, function( index, value ){
			console.log( "Name: " + value.name + "\t\tAwesomeness: " + value.awesomeness );
		});
	});
	
	$("#triggerDataPropogationButton").click( function(){
		$.each( characters, function( index, value ){
			$(characters).setField( value.name, 'over9000' );
		});
	});
});
