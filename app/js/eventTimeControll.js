

export default class eventTimeControll  {
    constructor( eventType, func, time, context = null, where = window ) {
        this.stopped = false;
        this.eventType = eventType;
        this.func = func;
        this.time = time;
        this.context = context;
        this.where = where;

        this.init();
    }

    init(){
        let eventTimer = ( event ) => {
            // window.removeEventListener( eventType, eventTimer );
            this.where['on'+this.eventType] = null;

            if( this.context && !this.stopped ) {
                this.func.call(this.context, event);

            }
            else if( !this.context && !this.stopped ) {
                this.func(event);
            }

            setTimeout(() => {
                // window.addEventListener( eventType, eventTimer);
                if( !this.stopped ) this.where['on'+this.eventType] = eventTimer;
            }, this.time )
        };
        this.where['on'+this.eventType] = eventTimer;
        // window.addEventListener( eventType, eventTimer);
    }

    stopEvent(){
        this.stopped = true;
    }

    goEvent(){
        this.stopped = false;
        this.init();
    }


}