Ext.ns('AOL.form');

/** 
 * @class AOL.form.CopyButton
 * @extends Ext.Button
 * This control allows you to copy a string value to the clipboard on mousedown/click.
 *
 * @xtype aol-copybutton
 */
AOL.form.CopyButton = Ext.extend(Ext.Container, {

	/** 
	 * sets the value to be copied to the clipboard
	 * @param {Object} val - string value to be copied to the clipboard
	 */
    setValueToCopy: function(val){
        this.value = val;
    },
    
    /** 
     * retrieves the value to be copied to the clipboard
     */
    getValueToCopy: function(){
        return this.value;
    },
	
    /** 
     * this repositions the flash movie when the button gets moved (zeroclipboard implementation)
     */    
    move: function(){
        this.clip.reposition();
    },
    
    
    afterrender: function(){
    
        this.value = '';        
		
        //set up clipboard client
        this.clip = new ZeroClipboard.Client();
        
        ZeroClipboard.setMoviePath(ADC.BIDPLACE.AppSettings.ZeroClipboardFlashPath);
        
		// update the text on mouse down     
        this.clip.addEventListener('mouseDown', function(client){
            this.clip.setText(this.getValueToCopy());
        }.createDelegate(this));
        
		
        //this positions the flash movie on top of the button (zeroclipboard implementation)
        this.clip.glue(this.items.items[0].id);
        
    },
    
    
    
    initComponent: function(){
    	
		//disable button if flash is not installed
		var hasFlash = false;
		
        if (navigator.mimeTypes["application/x-shockwave-flash"]) {
			hasFlash = true;
		}
		 
		//set up zeroclipboard client on afterrender		         
        this.on("afterrender", this.afterrender, this);
        
		 
		//this repositions the flash movie when the button gets moved (zeroclipboard implementation)
        this.on("move", this.move, this, {
            buffer: 600
        });
        
		 
		//button is placed inside a div container as recommended by zeroclipboard. this makes it easy
		//to reposition the flash movie on top of the button in case it gets moved.
		Ext.applyIf(this, {
            style: {
                position: 'relative'
            },
            items: [{
                xtype: 'button',
                text: this.copyText,
				disabled: !hasFlash
            }]
        });
        
        
        AOL.form.CopyButton.superclass.initComponent.call(this);       
       
    }      
    
});


Ext.reg('aol-copybutton', AOL.form.CopyButton);
