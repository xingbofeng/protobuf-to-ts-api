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

        /** GetExampleDataReq idGet */
        idGet?: (number|null);

        /** GetExampleDataReq nameGet */
        nameGet?: (string|null);
    }

    /** Properties of a GetExampleDataRsp. */
    interface IGetExampleDataRsp {

        /** GetExampleDataRsp statusGet */
        statusGet?: (test.Status[]|null);

        /** GetExampleDataRsp msgGet */
        msgGet?: (string|null);

        /** GetExampleDataRsp codeGet */
        codeGet?: (number|null);
    }

    /** Properties of a PostExampleDataReq. */
    interface IPostExampleDataReq {

        /** PostExampleDataReq idPost */
        idPost?: (number|null);

        /** PostExampleDataReq namePost */
        namePost?: (string|null);
    }

    /** Properties of a PostExampleDataRsp. */
    interface IPostExampleDataRsp {

        /** PostExampleDataRsp statusPost */
        statusPost?: (test.Status[]|null);

        /** PostExampleDataRsp msgPost */
        msgPost?: (string|null);

        /** PostExampleDataRsp codePost */
        codePost?: (number|null);
    }

    namespace API {
    }
}
