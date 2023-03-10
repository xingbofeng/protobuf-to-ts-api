/** Namespace example. */
export namespace example {

    /** Status enum. */
    enum Status {
        SUCCESS = 0,
        FAIL = 1,
        UNKNOWN = 2
    }

    /** Properties of a getExampleDataReq. */
    interface IgetExampleDataReq {

        /** getExampleDataReq idGet */
        idGet?: (number|null);

        /** getExampleDataReq nameGet */
        nameGet?: (string|null);
    }

    /** Properties of a getExampleDataRsp. */
    interface IgetExampleDataRsp {

        /** getExampleDataRsp statusGet */
        statusGet?: (example.Status[]|null);

        /** getExampleDataRsp msgGet */
        msgGet?: (string|null);

        /** getExampleDataRsp codeGet */
        codeGet?: (number|null);
    }

    /** Properties of a postExampleDataReq. */
    interface IpostExampleDataReq {

        /** postExampleDataReq idPost */
        idPost?: (number|null);

        /** postExampleDataReq namePost */
        namePost?: (string|null);
    }

    /** Properties of a postExampleDataRsp. */
    interface IpostExampleDataRsp {

        /** postExampleDataRsp statusPost */
        statusPost?: (example.Status[]|null);

        /** postExampleDataRsp msgPost */
        msgPost?: (string|null);

        /** postExampleDataRsp codePost */
        codePost?: (number|null);
    }

    namespace API {

        /**
         * Callback as used by {@link example.API#getExampleData}.
         * @param error Error, if any
         * @param [response] getExampleDataRsp
         */
        type getExampleDataCallback = (error: (Error|null), response?: example.getExampleDataRsp) => void;

        /**
         * Callback as used by {@link example.API#postExampleData}.
         * @param error Error, if any
         * @param [response] postExampleDataRsp
         */
        type postExampleDataCallback = (error: (Error|null), response?: example.postExampleDataRsp) => void;
    }
}
