/** Namespace example. */
export namespace example {

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
        statusGet?: (example.Status[]|null);

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
        statusPost?: (example.Status[]|null);

        /** PostExampleDataRsp msgPost */
        msgPost?: (string|null);

        /** PostExampleDataRsp codePost */
        codePost?: (number|null);
    }

    namespace API {

        /**
         * Callback as used by {@link example.API#getExampleData}.
         * @param error Error, if any
         * @param [response] GetExampleDataRsp
         */
        type getExampleDataCallback = (error: (Error|null), response?: example.GetExampleDataRsp) => void;

        /**
         * Callback as used by {@link example.API#postExampleData}.
         * @param error Error, if any
         * @param [response] PostExampleDataRsp
         */
        type postExampleDataCallback = (error: (Error|null), response?: example.PostExampleDataRsp) => void;
    }
}
