export default class AiRead{

    read( file, cb ){
        this.readTextFile(file)
        .then( aiData => {
            const labelList = [];
            aiData.response.annotationResults[0].shotLabelAnnotations.forEach( shotLabel => {
                const segElem = shotLabel.segments[0];
                if( segElem.confidence > .50){
                    const label = {
                        entity: shotLabel.entity.description
                    };
                    if( shotLabel && shotLabel.categoryEntities && shotLabel.categoryEntities[0].description ){
                        label.category = shotLabel && shotLabel.categoryEntities && shotLabel.categoryEntities[0].description
                    }
                    
                    label.endTimeOffset = segElem.segment.endTimeOffset;
                    label.startTimeOffset = segElem.segment.startTimeOffset;
                    labelList.push( label );
                }
            });
            cb( null, labelList );
        })
        .catch((e)=>{
            debugger;
            cb( e );
        });
    }

    readTextFile = (file) => {
        return new Promise((resolve, reject)=>{
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status === 200) {
                    resolve( JSON.parse(rawFile.responseText) );
                }
            }
            rawFile.send(null);
        })
    }

    transform = (aiData) => {
        
    }
}