import Button from "../ui/flowbite/form/button";
import Form from "../ui/flowbite/form/form";
import Input from "../ui/flowbite/form/input";

export default function CommentCreation() {
    return (
        <Form className="flex flex-row gap-2 justify-center items-center" onSubmit={() => {}}>
            <Input label="Comment" type="text" name="text" />
            <Button type="submit">Post</Button>
        </Form>
    )
}2