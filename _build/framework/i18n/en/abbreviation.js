(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../exporter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var exporter_1 = require("../exporter");
    var abbreviations = {
        exclamation: "yahoo,joomla,jeopardy",
        organization: "dept,univ,assn,bros,inc,ltd,co,agcy,agt,mfg",
        unit: "fl,ia,nm,ft,sq,lt,f,bpm,bps,lb,qt,rpm,tsp,k,k,bbl,cu,gal,m,doz,oz,\n    floz,gr,gro,kt,mi,mph,pt,sqm,t,tbsp,yd",
        honorific: "col,md,dr,acad,adm,amb,artd,as,assn,asst,atty,ba,bc,bca,br,bs,\n    bros,brig,capt,cmdr,comdr,corp,cpl,dsc,dvm,dis,doc,esq,fr,gen,gov,hc,hon,\n    icdr,ing,ingsheet,judr,jd,jr,llb,lt,ltcol,ma,mga,mgr,maj,messrs,mlle,mme,\n    mphil,mr,mrs,ms,msgr,mstr,mx,op,ord,odbas,ofc,paeddr,phmr,pharmdr,pres,\n    rcdr,rndr,rsdr,rtdr,sr,thd,thdr,thlic,thmgr,treas,phd,phdr,prof,pvt,rep,\n    reps,res,rev,sen,sens,sec,sgt,supt,surg",
        common: "abbr,ac,acc,afaik,aka,asap,btw,bcc,byob,ca,cca,cc,dc,dist,diy,\n    eg,eta,etc,ex,faq,fy,fyi,ie,lit,pl,ps,rip,rsvp,tba,vip,vs,wrt,adj,adv,det",
        place: "pl,ala,ariz,ark,cal,calif,colo,conn,dak,dc,del,col,fl,fla,flor,ga,ida,id\n    ,ill,il,ind,in,ia,kan,kans,ky,ken,la,md,mass,mich,minn,mn,miss,mo,mont,nebr,neb,nev,nv,nh,nj,\n    nmex,nm,ny,nc,ndak,nd,o,oh,okla,oreg,pa,penna,penn,ri,sc,sdak,sd,tenn,tex,tx,ut,vt,va,virg,\n    wis,wisc,wva,wyo,usafa,alta,ont,que,sask,apt,ave,blvd,bldg,ctr,cir,cres,ct,dr,expy,ext,ft,\n    fwy,hts,hwy,is,jct,ln,mt,pky,po,rd,rr,st,spg,spgs,sq,ste,str,ter,tce,univ,us,usa",
        month: "jan,feb,mar,jun,jul,aug,sep,sept,oct,nov,dec",
        day: "mon,tue,wed,thu,fri,sat"
    };
    exports.default = exporter_1.default(abbreviations);
});
//# sourceMappingURL=abbreviation.js.map