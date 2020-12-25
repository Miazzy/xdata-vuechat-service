const getters = {

    //  从联系人中提取出首字母 再排序

    contactsInitialList: async(state) => {
        try {
            var initialList = [];
            var allContacts = await Betools.contact.queryContacts();
            var max = allContacts.length;
            state.contact = allContacts;
            for (var i = 0; i < max; i++) {
                if (initialList.indexOf(allContacts[i].initial.toUpperCase()) == -1) {
                    initialList.push(allContacts[i].initial.toUpperCase());
                }
            }
            return initialList.sort();
        } catch (error) {
            console.log(error);
        }
    },

    // 将联系人根据首字母进行分类
    contactsList: async(state, getters) => {
        try {
            var initialList = [];
            var allContacts = await Betools.contact.queryContacts();
            var max = allContacts.length;
            state.contact = allContacts;
            for (var i = 0; i < getters.contactsInitialList.length; i++) {
                var protoTypeName = getters.contactsInitialList[i];
                contactsList[protoTypeName] = [];
                for (var j = 0; j < max; j++) {
                    if (allContacts[j].initial.toUpperCase() === protoTypeName) {
                        contactsList[protoTypeName].push(allContacts[j]);
                    }
                }
            }
            return contactsList;
        } catch (error) {
            console.log(error);
        }
    }
}

export default getters