/** Namespace test. */
export namespace test {

    /** Status enum. */
    enum Status {
        SUCCESS = 0,
        FAIL = 1,
        UNKNOWN = 2
    }

    /** Properties of a GetExampleDataReq. */
    interface IGetExampleDataReq {
        /** GetExampleDataReq id */
        id: number;
        /** GetExampleDataReq name */
        name: string;
    }

    /** Properties of a GetExampleDataRsp. */
    interface IGetExampleDataRsp {
        /** GetExampleDataRsp status */
        status: test.Status[];
        /** GetExampleDataRsp msg */
        msg: string;
        /** GetExampleDataRsp city */
        city: string;
        /** GetExampleDataRsp code */
        code: number;
    }

    /** Properties of a PostExampleDataReq. */
    interface IPostExampleDataReq {
        /** PostExampleDataReq id */
        id: number;
        /** PostExampleDataReq name */
        name: string;
    }

    /** Properties of a PostExampleDataRsp. */
    interface IPostExampleDataRsp {
        /** PostExampleDataRsp status */
        status: test.Status[];
        /** PostExampleDataRsp msg */
        msg: string;
        /** PostExampleDataRsp code */
        code: number;
    }

    namespace API {
    }
}
